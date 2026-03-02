import type { Express } from "express";
import { type Server } from "http";
import { z } from "zod";

const contactSchema = z.object({
  topic: z.enum(["project", "service", "career", "info"]),
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  message: z.string().min(1),
  projectType: z.string().optional().default(""),
  projectTypeOther: z.string().optional().default(""),
  equipmentId: z.string().optional().default(""),
  urgency: z.string().optional().default(""),
  position: z.string().optional().default(""),
  portfolio: z.string().optional().default(""),
  website: z.string().optional().default(""),
});

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip =
      typeof forwardedFor === "string"
        ? forwardedFor.split(",")[0].trim()
        : req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const existing = rateLimits.get(ip);
    if (!existing || existing.resetAt <= now) {
      rateLimits.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    } else if (existing.count >= rateLimitMax) {
      return res.status(429).json({ message: "Previše zahteva. Pokušajte kasnije." });
    } else {
      existing.count += 1;
      rateLimits.set(ip, existing);
    }

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Neispravni podaci." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Nedostaje RESEND_API_KEY." });
    }

    const data = parsed.data;
    if (data.website && data.website.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }
    if (data.topic === "project" && !data.projectType.trim()) {
      return res.status(400).json({ message: "Tip projekta je obavezan." });
    }
    if (data.topic === "project" && data.projectType === "other" && !data.projectTypeOther.trim()) {
      return res.status(400).json({ message: "Drugi tip projekta je obavezan." });
    }
    if (data.topic === "service" && !data.equipmentId.trim()) {
      return res.status(400).json({ message: "ID opreme je obavezan." });
    }
    if (data.topic === "service" && !data.urgency.trim()) {
      return res.status(400).json({ message: "Hitnost je obavezna." });
    }
    if (data.topic === "career" && !data.position.trim()) {
      return res.status(400).json({ message: "Pozicija je obavezna." });
    }
    const topicLabels: Record<string, string> = {
      project: "Novi projekat",
      service: "Servis",
      career: "Karijera",
      info: "Info",
    };
    const recipients: Record<string, string> = {
      project: "tehnika@eef.rs",
      service: "servis@eef.rs",
      career: "office@eef.rs",
      info: "office@eef.rs",
    };

    const label = topicLabels[data.topic] ?? "Kontakt";
    const to = recipients[data.topic] ?? "office@eef.rs";
    const from = process.env.RESEND_FROM || "onboarding@resend.dev";
    const projectTypeValue =
      data.projectType === "other" ? data.projectTypeOther : data.projectType;
    const fields = [
      ["Tema", label],
      ["Ime i prezime", data.name],
      ["Kompanija", data.company],
      ["Email", data.email],
      ["Poruka", data.message],
      ["Tip projekta", projectTypeValue],
      ["ID opreme", data.equipmentId],
      ["Hitnost", data.urgency],
      ["Pozicija", data.position],
      ["LinkedIn / Portfolio", data.portfolio],
    ] as const;

    const filledFields = fields.filter(([, value]) => value && value.trim().length > 0);

    const text = filledFields.map(([key, value]) => `${key}: ${value}`).join("\n");
    const html = filledFields
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Kontakt - ${label} - ${data.name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(502).json({ message: "Resend greška.", details });
    }

    return res.status(200).json({ ok: true });
  });

  return httpServer;
}
