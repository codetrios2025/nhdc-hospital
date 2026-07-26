import createCrudService from "../factory/createCrudService";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const userService = createCrudService(API_ENDPOINTS.USERS);

export default userService;
