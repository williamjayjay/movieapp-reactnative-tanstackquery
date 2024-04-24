import { fetchAccountState } from '@/api/account';
import { addMovieToFavoriteList } from '@/api/favorite';
import { fetchMovie } from '@/api/movies';
import { addMovieToWatchList } from '@/api/watchlist';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';

function MoviesDetails() {

    const { id } = useLocalSearchParams()

    const client = useQueryClient();

    const [movieQuery, accountQuery] = useQueries({
        queries: [
            {
                queryKey: ['movies', id],
                queryFn: () => fetchMovie(Number(id))
            },

            {
                queryKey: ['account', id],
                queryFn: () => fetchAccountState(Number(id))
            },
        ],
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => addMovieToWatchList(Number(id), !accountQuery?.data?.watchlist),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['watchlist'] });
            accountQuery.refetch()
        },

    });

    const { mutate: mutateFavorite, isPending: isPendingFavorite } = useMutation({
        mutationFn: () => addMovieToFavoriteList(Number(id), !accountQuery?.data?.favorite),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['favorite'] });
            accountQuery.refetch()
        },

    });


    if (movieQuery?.isLoading) {
        return <ActivityIndicator />;
    }

    if (movieQuery?.error) {
        return <Text>Failed to fetch data</Text>;
    }

    if (accountQuery?.isLoading) {
        return <ActivityIndicator />;
    }

    if (accountQuery?.error) {
        return <Text>Failed to fetch data</Text>;
    }

    return (
        <>
            <Stack.Screen options={{ title: movieQuery?.data?.title }} />
            <Image
                source={{
                    uri: process.env.EXPO_PUBLIC_IMAGES_URL + movieQuery?.data?.backdrop_path,
                }}
                style={{ width: '100%', height: 300 }}
            />
            <View style={{ padding: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }} >

                    <Text style={{ fontSize: 30, fontWeight: '500', flexShrink: 1 }}>
                        {movieQuery?.data?.title}
                    </Text>

                    <TouchableOpacity
                        disabled={isPending}
                        onPress={() => mutateFavorite()}
                        style={{ flexDirection: 'row', alignItems: 'center', }}
                    >

                        <View style={{ width: 26, height: 26, marginTop: 8, zIndex: 999, }} >
                            {
                                isPendingFavorite ?
                                    <ActivityIndicator size={24} />
                                    :
                                    (accountQuery?.data?.favorite)
                                        ?
                                        <MaterialCommunityIcons name="cards-heart" size={24} color="red" />
                                        :
                                        <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" />
                            }
                        </View>


                    </TouchableOpacity>
                </View>


                <View >

                    <TouchableOpacity
                        disabled={isPending}
                        onPress={() => mutate()}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                    >

                        <View style={{ width: 26, height: 26, alignItems: 'center', justifyContent: 'center' }} >
                            {
                                isPending ?
                                    <ActivityIndicator size={24} />
                                    :
                                    (accountQuery?.data?.watchlist)
                                        ?
                                        <FontAwesome name="bookmark" size={24} color='red' />
                                        :
                                        <FontAwesome name="bookmark-o" size={24} color='black' />
                            }
                        </View>


                        <Text>Adicionar para assitir depois</Text>
                    </TouchableOpacity>


                </View>

            </View>

            <View style={{ flex: 1, paddingHorizontal: 10 }}  >
                <ScrollView  >
                    <Text style={{ fontSize: 16 }}>1{movieQuery?.data?.overview}</Text>
                    <View style={{ height: 10 }} />
                </ScrollView>
            </View>


        </>
    )
}

export default MoviesDetails