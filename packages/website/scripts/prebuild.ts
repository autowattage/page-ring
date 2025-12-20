import { cp, rmdir } from "fs/promises";
import path from "path";

const fromDir = path.join(__dirname, "../../embed/dist");
const toDir = path.join(__dirname, "../public/embed");

try {
  await rmdir(toDir, { recursive: true });
} catch (e) {}
await cp(fromDir, toDir, {
  recursive: true,
  force: true,
});
