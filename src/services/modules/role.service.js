
import ApiService from '@/services/configs/api.service'

export default RolesService = {

    query(type, params) {
      return ApiService.query("roles", {
        params: params
      });
    },

    get(slug) {
      return ApiService.get("roles", slug);
    },

    create(params) {
      return ApiService.post("roles", { role: params });
    },

    update(slug, params) {
      return ApiService.update("roles", slug, { role: params });
    },

    destroy(slug) {
      return ApiService.delete(`roles/${slug}`);
    },

    permissions(slug) {
      return ApiService.get(`roles/${slug}/permissions`);
    },

  };