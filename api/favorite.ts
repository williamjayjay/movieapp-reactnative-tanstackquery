import { verifyEnvironment } from "./api";

export const fetchFavoritelistMovies = async () => {
    const { headers } = verifyEnvironment()

    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.desc`

    const options = {
        method: 'GET',
        headers: headers
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json.results;
};

export const addMovieToFavoriteList = async (movieId: number, favorite: boolean) => {

    const { headersPost } = verifyEnvironment()
    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/favorite`

    const options = {
        method: 'POST',
        headers: headersPost,
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            favorite: favorite,
        }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json;
};