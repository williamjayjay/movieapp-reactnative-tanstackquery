import { verifyEnvironment } from "./api";

export const fetchWatchlistMovies = async () => {
    const { headers } = verifyEnvironment()

    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc`

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

export const addMovieToWatchList = async (movieId: number, watchlist: boolean) => {

    const { headersPost } = verifyEnvironment()
    const url = process.env.EXPO_PUBLIC_MOVIES_URL + `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/watchlist`

    const options = {
        method: 'POST',
        headers: headersPost,
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: watchlist,
        }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Falha ao buscar filmes')
    }

    const json = await res.json();
    return json;
};