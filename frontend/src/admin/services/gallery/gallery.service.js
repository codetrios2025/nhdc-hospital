import createCrudService from "../factory/createCrudService";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const galleryService = createCrudService(API_ENDPOINTS.GALLERY);

export default galleryService;
