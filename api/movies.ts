import { verifyEnvironment } from "./api";

export const fetchTopRatedMovies = async ({ pageParam }: any) => {

    const { headers } = verifyEnvironment()

    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `movie/top_rated?language=en-US&page=${pageParam}`

    const options: RequestInit = {
        method: 'GET',
        headers: headers
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json.results;
}


export const fetchMovie = async (id: number) => {

    const { headers } = verifyEnvironment()

    const url = `${process.env.EXPO_PUBLIC_MOVIES_URL}movie/${id}?language=en-US`;

    const options: RequestInit = {
        method: 'GET',
        headers: headers
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json;
};

