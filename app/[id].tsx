import { fetchMovie } from '@/api/movies';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

function MoviesDetails() {

    const { id } = useLocalSearchParams()

    const {
        data: movie,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['movies', id],
        queryFn: () => fetchMovie(Number(id)),
    });

    console.log(id)

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch data</Text>;
    }

    return (
        <View>
            <Stack.Screen options={{ title: movie.title }} />
            <Image
                source={{
                    uri: process.env.EXPO_PUBLIC_IMAGES_URL + movie.backdrop_path,
                }}
                style={{ width: '100%', height: 300 }}
            />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: '500', marginVertical: 10 }}>
                    {movie.title}
                </Text>
                <View style={{ marginVertical: 10 }}>
                    {/* <Pressable
              onPress={() => mutate()}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <FontAwesome name="bookmark-o" size={24} color="black" />
              <Text>Add to watchlist</Text>
            </Pressable> */}
                </View>
                <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
            </View>
        </View>
    )
}

export default MoviesDetails