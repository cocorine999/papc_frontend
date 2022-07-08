
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

    projet(slug) {
      return ApiService.get(`composantes/${slug}/projets`);
    },

    sous_composantes(slug) {
      return ApiService.get(`composantes/${slug}/sous-composantes`);
    },

    activites(slug) {
      return ApiService.get(`composantes/${slug}/activites`);
    }

  };

  export default ComposantesService;
  