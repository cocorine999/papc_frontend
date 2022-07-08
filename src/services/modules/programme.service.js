
import ApiService from "@/services/configs/api.service"

const ProgrammeService = {

    query(type, params) {
      return ApiService.query("programmes", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("programmes", slug);
    },

    create(params) {
      return ApiService.post("programmes", params);
    },

    update(slug, params) {
      return ApiService.update("programmes", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`programmes/${slug}`);
    },

    uniteeGestion(slug) {
      return ApiService.get(`programmes/${slug}/unitee-de-gestion`);
    }

  };

  export default ProgrammeService;
  