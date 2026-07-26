import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const faqService = createCrudService(API_ENDPOINTS.FAQS);

export default faqService;
