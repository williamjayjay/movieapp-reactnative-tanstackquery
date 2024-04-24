import { verifyEnvironment } from "./api";


export const addMovieToWatchList = async (movieId: number) => {

    const { headersPost } = verifyEnvironment()
    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/watchlist`

    const options = {
        method: 'POST',
        headers: headersPost,
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: true,
        }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json;
};