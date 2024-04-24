import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '@/api/movies';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MovieListItem } from '@/components/MovieListItem';

export default function TabOneScreen() {

  const { data, isLoading, error, fetchNextPage, isPending } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: fetchTopRatedMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages?.length + 1,
  });

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error?.message}</Text>
  }

  const movies = data?.pages?.flat();

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item, index }: any) => <MovieListItem key={index} movie={item} />}
        onEndReached={() => {
          fetchNextPage()
        }}

        ListFooterComponent={() => (
          <ActivityIndicator size="large" color="black" />
        )}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
