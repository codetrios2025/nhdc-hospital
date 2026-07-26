import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const testimonialService = createCrudService(API_ENDPOINTS.TESTIMONIALS);

export default testimonialService;
