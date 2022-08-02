
import ApiService from '@/services/configs/api.service'

const ActiviteService = {

    query(type, params) {
      return ApiService.query("activites", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("activites", slug);
    },

    create(params) {
      return ApiService.post("activites", params);
    },

    update(slug, params) {
      return ApiService.update("activites", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`activites/${slug}`);
    },

    composante(slug) {
      return ApiService.get(`activites/${slug}/composante`);
    },

    taches(slug) {
      return ApiService.get(`activites/${slug}/taches`);
    }

  };

  export default ActiviteService;
  