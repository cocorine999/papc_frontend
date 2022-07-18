
import ApiService from '@/services/configs/api.service'

const ComposantesService = {

    query(type, params) {
      return ApiService.query("composantes", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("composantes", slug);
    },

    create(params) {
      return ApiService.post("composantes", params);
    },

    update(slug, params) {
      return ApiService.update("composantes", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`composantes/${slug}`);
    },

    sous_composantes(slug) {
      return ApiService.get(`composantes/sousComposantes/${slug}`);
    },

    activites(slug) {
      return ApiService.get(`composantes/activites/${slug}`);
    },

    programme(slug) {
      return ApiService.get(`programmes/composantes/${slug}`);
    },
    programmeSc(slug) {
      return ApiService.get(`programmes/sousComposantes/${slug}`);
    },

  };

  export default ComposantesService;
  