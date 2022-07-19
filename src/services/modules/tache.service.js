
import ApiService from '@/services/configs/api.service'

const TachesService = {

    query(type, params) {
      return ApiService.query("taches", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("taches", slug);
    },

    create(params) {
      return ApiService.post("taches", params);
    },

    update(slug, params) {
      return ApiService.update("taches", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`taches/${slug}`);
    },

    composante(slug) {
      return ApiService.get(`taches/${slug}/composantes`);
    },
    programme(slug) {
      return ApiService.get(`programmes/taches/${slug}`);
    },

  };

  export default TachesService;
  