import axios from "axios";

export const peopleAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
export const planetsAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`);
export const speciesAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/species/?page=${currentPage}`);