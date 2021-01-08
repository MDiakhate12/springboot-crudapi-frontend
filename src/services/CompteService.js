import api from "../utils/Axios";

const getAll = () => api.get("/comptes");
const get = (id) => api.get(`/comptes/${id}`);
const create = (idAgence, idClient, compte) =>
  api.post(`/agences/${idAgence}/clients/${idClient}/comptes`, compte);
const update = (id, compte) => api.put(`/comptes/${id}`, compte);
const getComptesByAgence = (idAgence) =>
  api.get(`/agences/${idAgence}/comptes`);
const getComptesByClient = (idClient) =>
  api.get(`/clients/${idClient}/comptes`);
const remove = (id) => api.delete(`comptes/${id}`);

export const compteService = {
  getAll,
  get,
  create,
  update,
  remove,
  getComptesByAgence,
  getComptesByClient,
};
