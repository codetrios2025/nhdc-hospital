import createCrudService from "../factory/createCrudService";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const roleService = createCrudService(API_ENDPOINTS.ROLES);

export default roleService;
