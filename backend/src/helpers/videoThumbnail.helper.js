const ffmpeg = require("fluent-ffmpeg");

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobeInstaller = require("@ffprobe-installer/ffprobe");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const path = require("path");

const createThumbnail = (videoPath, outputFolder) => {
  return new Promise((resolve, reject) => {
    const thumbnailName = `${Date.now()}.jpg`;

    ffmpeg(videoPath)
      .on("end", () => {
        resolve(thumbnailName);
      })
      .on("error", (err) => {
        reject(err);
      })
      .screenshots({
        count: 1,
        folder: outputFolder,
        filename: thumbnailName,
        size: "640x360",
      });
  });
};

module.exports = createThumbnail;
