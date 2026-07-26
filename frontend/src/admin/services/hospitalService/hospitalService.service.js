import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const hospitalService = createCrudService(API_ENDPOINTS.SERVICES);

export default hospitalService;
