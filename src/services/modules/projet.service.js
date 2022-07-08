
import ApiService from '@/services/configs/api.service'

const ProjetsService = {

    query(type, params) {
      return ApiService.query("projets", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("projets", slug);
    },

    create(params) {
      return ApiService.post("projets", params);
    },

    update(slug, params) {
      return ApiService.update("projets", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`projets/${slug}`);
    },

    programme(slug) {
      return ApiService.get(`projets/${slug}/programmes`);
    },

    composantes(slug) {
      return ApiService.get(`projets/${slug}/composantes`);
    }

  };

  export default ProjetsService;
  