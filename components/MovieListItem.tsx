import { Link } from 'expo-router';
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';

export function MovieListItem({ movie }) {
    return (
        <Link href={`/${movie.id}`} asChild >
            <Pressable style={{ flex: 1, }} >
                <Image

                    source={{
                        uri: process.env.EXPO_PUBLIC_IMAGES_URL + movie?.poster_path
                    }}

                    style={{ width: '100%', aspectRatio: 3 / 5, borderRadius: 20 }}

                />

                {/* <Text>{movie?.title}</Text> */}
            </Pressable>
        </Link>

    )
}