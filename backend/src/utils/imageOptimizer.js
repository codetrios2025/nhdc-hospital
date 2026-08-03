const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const optimizeImage = async ({
  inputPath,
  outputDir,
  width = 1920,
  quality = 80,
}) => {
  await fs.mkdir(outputDir, {
    recursive: true,
  });

  const fileName = `${Date.now()}.webp`;

  const outputPath = path.join(outputDir, fileName);

  await sharp(inputPath)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({
      quality,
    })
    .toFile(outputPath);

  /*
  |--------------------------------------------------------------------------
  | Wait for Sharp to release file handle
  |--------------------------------------------------------------------------
  */

  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    await fs.unlink(inputPath);
  } catch (err) {
    console.log("Temp file cleanup skipped:", err.message);
  }

  return fileName;
};

module.exports = optimizeImage;
