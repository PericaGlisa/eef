import "dotenv/config";
import express from "express";
import { registerRoutes } from "./server/routes";
import { createServer } from "http";
import { setupVite } from "./server/vite";

const app = express();
const httpServer = createServer(app);

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    await registerRoutes(httpServer, app);
    await setupVite(httpServer, app);

    const port = parseInt(process.env.PORT || "5174", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
      },
      () => {
        console.log(`${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })} [express] serving on port ${port}`);
      },
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
