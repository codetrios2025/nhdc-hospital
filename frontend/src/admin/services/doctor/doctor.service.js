import createCrudService from "../factory/createCrudService";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const doctorService = createCrudService(API_ENDPOINTS.DOCTORS);

export default doctorService;
