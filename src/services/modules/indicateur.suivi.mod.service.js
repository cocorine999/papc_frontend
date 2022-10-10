
import ApiService from '@/services/configs/api.service'

const IndicateurSuiviService = {

    query(type, params) {
      return ApiService.query("suivi-indicateurs-mods", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("suivi-indicateurs-mods", slug);
    },
    getBailleurSuivi(slug) {
      return ApiService.get("bailleur/suiviIndicateurs", slug);
    },
    
    checksuivi(slug, params) {
      return ApiService.get(`indicateurs/${slug}/checkSuivi/${params}`);
    },
    mySuivis(slug) {
      return ApiService.get(`indicateurs/${slug}/suivis`);
    },
    create(params) {
      return ApiService.post("suivi-indicateurs-mods", params);
    },

    filtre(params) {
      return ApiService.post("suivi-indicateurs-mods/filter", params);
    },

    update(slug, params) {
      return ApiService.update("suivi-indicateurs-mods", slug, params);
    },

    destroy(slug) {
      return ApiService.delete(`suivi-indicateurs-mods/${slug}`);
    },

    programmes(slug) {
      return ApiService.get(`suivi-indicateurs-mods/${slug}/programmes`);
    }

  };

  export default IndicateurSuiviService;
  