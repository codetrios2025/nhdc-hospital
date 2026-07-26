import createCrudService from "../factory/createCrudService";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const serviceService = createCrudService(API_ENDPOINTS.SERVICES);

export default serviceService;
