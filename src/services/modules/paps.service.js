
import ApiService from '@/services/configs/api.service'

const ProjetsService = {

    query(type, params) {
      return ApiService.query("sinistres", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("/sinistres", slug);
    },

    create(params) {
      return ApiService.post("sinistres", params);
    },

    update(slug, params) {
      return ApiService.update("sinistres", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`sinistres/${slug}`);
    },

    programme(slug) {
      return ApiService.get(`programmes/${slug}/sinistres`);
    },

  };

  export default ProjetsService;
  