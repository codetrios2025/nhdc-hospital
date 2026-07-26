import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const videoService = createCrudService(API_ENDPOINTS.VIDEOS);

export default videoService;
