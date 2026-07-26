import createCrudService from "../factory/createCrudService";

const cmsService = {
  page(slug) {
    return createCrudService(`/cms/${slug}`);
  },
};

export default cmsService;
