import { verifyEnvironment } from "./api";


export const fetchAccountState = async (id: number) => {

    const { headers } = verifyEnvironment()

    const url = `${process.env.EXPO_PUBLIC_MOVIES_URL}movie/${id}/account_states`;

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
