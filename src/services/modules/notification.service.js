
import ApiService from '@/services/configs/api.service'

const NotificationService = {

    query(type, params) {
      return ApiService.query("mods", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("utilisateur/getNotifications", slug);
    },

    create(params) {
      return ApiService.post("mods", params);
    },

    checkMessage(params) {
     
      return ApiService.post("utilisateur/readNotifications", params);
    },

    destroy(slug) {
      return ApiService.delete(`mods/${slug}`);
    },

    programme(slug) {
      return ApiService.get(`mods/${slug}/programmes`);
    }

  };

  export default NotificationService;
  