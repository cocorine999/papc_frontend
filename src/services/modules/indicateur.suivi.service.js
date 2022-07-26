
import ApiService from '@/services/configs/api.service'

const IndicateursService = {

    query(type, params) {
      return ApiService.query("suivi-indicateurs", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("suivi-indicateurs", slug);
    },

    create(params) {
      return ApiService.post("suivi-indicateurs", params);
    },

    update(slug, params) {
      return ApiService.update("suivi-indicateurs", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`suivi-indicateurs/${slug}`);
    },

    programmes(slug) {
      return ApiService.get(`suivi-indicateurs/${slug}/programmes`);
    }

  };

  export default IndicateursService;
  