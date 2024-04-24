const verifyEnvironment = () => {
    if (!process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN) {
        throw new Error('Chave API não encontrada');
    }

    if (!process.env.EXPO_PUBLIC_MOVIES_URL) {
        throw new Error('Url API não encontrada');
    }

    if (!process.env.EXPO_PUBLIC_IMAGES_URL) {
        throw new Error('Url API de imagens não encontrada');
    }

    const headers: HeadersInit = {
        accept: 'application/json',
        Authorization: process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN
    };

    return headers

};


export const fetchTopRatedMovies = async () => {

    const headers = verifyEnvironment()

    const url = process.env.EXPO_PUBLIC_MOVIES_URL + 'top_rated?language=en-US&page=1'

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

    const headers = verifyEnvironment()

    const url = `${process.env.EXPO_PUBLIC_MOVIES_URL}${id}?language=en-US`;

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

