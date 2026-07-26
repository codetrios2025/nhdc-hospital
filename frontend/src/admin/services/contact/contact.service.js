import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const contactService = createCrudService(API_ENDPOINTS.CONTACTS);

export default contactService;
