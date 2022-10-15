import axios from "axios";

export const peopleAPI = (currentPage) =>  axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
export const planetsAPI = (currentPage) =>  axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`);
export const speciesAPI = (currentPage) =>  axios.get(`https://swapi.dev/api/species/?page=${currentPage}`);