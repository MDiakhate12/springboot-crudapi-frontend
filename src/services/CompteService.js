import api from "../utils/Axios";

const getAll = () => api.get("/comptes");
const get = (id) => api.get(`/comptes/${id}`);
const create = (idAgence, idClient, compte) => api.post(`/agences/${idAgence}/clients/${idClient}/comptes`, compte);
const update = (id, compte) => api.put(`/comptes/${id}`, compte);
const remove = (id) => api.delete(`comptes/${id}`);

export const compteService = {
  getAll,
  get,
  create,
  update,
  remove,
};
