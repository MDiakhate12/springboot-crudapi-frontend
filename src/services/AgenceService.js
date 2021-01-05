import api from "../utils/Axios";

const getAll = () => api.get("/agences");
const get = (id) => api.get(`/agences/${id}`);
const create = (agence) => api.post("/agences", agence);
const update = (id, agence) => api.put(`/agences/${id}`, agence);
const remove = (id) => api.delete(`agences/${id}`);

export const agenceService = {
  getAll,
  get,
  create,
  update,
  remove,
};
