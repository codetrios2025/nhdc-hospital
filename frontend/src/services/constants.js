import config from "../config";

const constants = {};

// if (window.location.hostname === "") {
//   constants.API_BASE_URL = ''; // Base url
// } else {
  constants.API_BASE_URL = config.API_BASE_URL;
  constants.Image_BASE_URL = config.IMAGE_BASE_URL;
  constants.File_BASE_URL = config.FILE_BASE_URL;
// }

export default constants;