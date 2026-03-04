import { execFileSync } from "node:child_process";

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function tryRunGit(args) {
  try {
    return { ok: true, out: runGit(args) };
  } catch (e) {
    return {
      ok: false,
      out: (e?.stdout?.toString?.() ?? "").trim(),
      err: (e?.stderr?.toString?.() ?? "").trim(),
      code: e?.status ?? null,
    };
  }
}

const status = runGit(["status", "--porcelain=v1"]);
if (!status) {
  console.log("No local changes to commit.");
  process.exit(0);
}

console.log("Staging...");
runGit(["add", "-A"]);

const message = `perf: hero LCP + route splitting (${new Date().toISOString().slice(0, 19)})`;
console.log(`Committing: ${message}`);

const commitResult = tryRunGit(["commit", "--no-verify", "-m", message]);
if (!commitResult.ok) {
  console.error("Commit failed.");
  if (commitResult.out) console.error(commitResult.out);
  if (commitResult.err) console.error(commitResult.err);
  process.exit(1);
}

console.log(commitResult.out);

const head = runGit(["rev-parse", "HEAD"]);
console.log(`HEAD: ${head}`);

console.log("Pushing to origin/main...");
const pushResult = tryRunGit(["push", "origin", "main"]);
if (!pushResult.ok) {
  console.error("Push failed.");
  if (pushResult.out) console.error(pushResult.out);
  if (pushResult.err) console.error(pushResult.err);
  process.exit(1);
}
if (pushResult.out) console.log(pushResult.out);
if (pushResult.err) console.log(pushResult.err);

const remote = runGit(["ls-remote", "origin", "refs/heads/main"]);
console.log(`origin/main: ${remote}`);
