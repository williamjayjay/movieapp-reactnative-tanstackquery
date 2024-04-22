

export const fetchTopRatedMovies = async () => {

    if (!process.env.EXPO_PUBLIC_MOVIES_URL) {
        throw new Error('API key not found');
    }


    if (!process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN) {
        throw new Error('API key not found');
    }


    const url = process.env.EXPO_PUBLIC_MOVIES_URL
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN
        }
    };

    try {
        const res = await fetch(url, options)

        if (!res.ok) {
            throw new Error('Falha ao buscar filmes')
        }

        const json = await res.json()
        return json.results
    } catch (error) {
        console.log('error: --', error)
        throw new Error('Error catch: ' + error)


    }
}