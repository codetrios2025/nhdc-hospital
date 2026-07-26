import createCrudService from "../factory/createCrudService";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const seoService = createCrudService(API_ENDPOINTS.SEO);

export default seoService;
