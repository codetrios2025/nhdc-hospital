const fs = require("fs");
const path = require("path");

if (process.platform !== "linux") {
  console.log("Skipping binary permission fix on non-Linux OS.");
  process.exit(0);
}

const binaries = [
  path.join(
    __dirname,
    "..",
    "node_modules",
    "@ffprobe-installer",
    "linux-x64",
    "ffprobe",
  ),
  path.join(
    __dirname,
    "..",
    "node_modules",
    "@ffmpeg-installer",
    "linux-x64",
    "ffmpeg",
  ),
];

for (const binary of binaries) {
  try {
    if (fs.existsSync(binary)) {
      fs.chmodSync(binary, 0o755);
      console.log(`Executable permission set: ${binary}`);
    } else {
      console.log(`Binary not found: ${binary}`);
    }
  } catch (error) {
    console.error(`Failed to chmod ${binary}:`, error.message);
    process.exitCode = 1;
  }
}
