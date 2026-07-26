exports.getYoutubeId = (url) => {
  if (!url) return "";

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[7].length === 11 ? match[7] : "";
};

exports.getEmbedUrl = (url) => {
  const id = exports.getYoutubeId(url);

  if (!id) return "";

  return `https://www.youtube.com/embed/${id}`;
};
