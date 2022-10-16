import axios from "axios";

export const peopleAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
export const planetsAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`);
export const speciesAPI = (currentPage: string | number) =>  axios.get(`https://swapi.dev/api/species/?page=${currentPage}`);

export const fetchPeople = async(currentPage: number) => {
    let error: boolean = false;
    let combined: Array<any> = [];
    try {
        const response: Array<any> = [] = await Promise.all([peopleAPI(currentPage), planetsAPI(currentPage), speciesAPI(currentPage)]);
        const [characterData, planetData, specieData] = response;
        combined = characterData?.data?.results.map((item: any, index: number) => {
            return {...item, name: item?.name, planetName: planetData?.data?.results[index]?.name, specieName: specieData?.data?.results[index]?.name}
        });
    } catch (err) {
        error = true;
    }

    return {
        error,
        combined,
    }
};
