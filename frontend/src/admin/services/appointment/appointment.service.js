import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const appointmentService = createCrudService(API_ENDPOINTS.APPOINTMENTS);

export default appointmentService;
