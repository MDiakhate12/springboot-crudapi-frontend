import api from "../utils/Axios";

const getAll = () => api.get("/clients");
const get = (id) => api.get(`/clients/${id}`);
const create = (client) => api.post("/clients", client);
const update = (id, client) => api.put(`/clients/${id}`, client);
const remove = (id) => api.delete(`clients/${id}`);

export const clientService = {
  getAll,
  get,
  create,
  update,
  remove,
};
