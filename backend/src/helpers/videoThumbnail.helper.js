const ffmpeg = require("fluent-ffmpeg");

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobeInstaller = require("@ffprobe-installer/ffprobe");

const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const createThumbnail = (videoPath, outputFolder) => {
  return new Promise((resolve, reject) => {
    if (!videoPath) {
      return reject(new Error("Video path is missing."));
    }

    const absoluteVideoPath = path.isAbsolute(videoPath)
      ? videoPath
      : path.resolve(videoPath);

    const absoluteOutputFolder = path.isAbsolute(outputFolder)
      ? outputFolder
      : path.resolve(outputFolder);

    fs.mkdirSync(absoluteOutputFolder, {
      recursive: true,
    });

    const thumbnailName = `${Date.now()}.jpg`;

    console.log("==================================");
    console.log("Creating video thumbnail");
    console.log("Video:", absoluteVideoPath);
    console.log("Output:", absoluteOutputFolder);
    console.log("FFmpeg:", ffmpegInstaller.path);
    console.log("FFprobe:", ffprobeInstaller.path);
    console.log("==================================");

    ffmpeg(absoluteVideoPath)
      .on("end", () => {
        console.log("Thumbnail created:", thumbnailName);

        resolve(thumbnailName);
      })
      .on("error", (err) => {
        console.error("Thumbnail generation error:", err);

        reject(err);
      })
      .screenshots({
        count: 1,
        folder: absoluteOutputFolder,
        filename: thumbnailName,
        size: "640x360",
      });
  });
};

module.exports = createThumbnail;
