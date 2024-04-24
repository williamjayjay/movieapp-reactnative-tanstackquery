export const verifyEnvironment = () => {
    if (!process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN) {
        throw new Error('Chave API não encontrada');
    }

    if (!process.env.EXPO_PUBLIC_MOVIES_URL) {
        throw new Error('Url API não encontrada');
    }

    if (!process.env.EXPO_PUBLIC_IMAGES_URL) {
        throw new Error('Url API de imagens não encontrada');
    }

    if (!process.env.EXPO_PUBLIC_ACCOUNT_ID) {
        throw new Error('ID da conta não encontrado');
    }

    const headers: HeadersInit = {
        accept: 'application/json',
        Authorization: process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN
    };

    const headersPost: HeadersInit = {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.EXPO_PUBLIC_MOVIES_BEARER_TOKEN
    };

    return { headers, headersPost }

};