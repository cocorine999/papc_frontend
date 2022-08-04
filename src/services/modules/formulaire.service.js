
import ApiService from "@/services/configs/api.service"

const FormulaireService = {

    query(type, params) {
      return ApiService.query("formulaires", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("formulaires", slug);
    },

    create(params) {
      return ApiService.post("formulaires", params);
    },

    update(slug, params) {
      return ApiService.update("formulaires", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`formulaires/${slug}`);
    },

  };

  export default FormulaireService;
  