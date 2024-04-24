import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '@/api/movies';
import { useQuery } from '@tanstack/react-query';
import { MovieListItem } from '@/components/MovieListItem';

export default function TabOneScreen() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchTopRatedMovies
  })

  // const [movies, setMovies] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {

  //   const fetchMovies = async () => {
  //     setIsLoading(true)

  //     try {
  //       const movies = await fetchTopRatedMovies()
  //       setMovies(movies)

  //     } catch (error) {
  //       setError(error)

  //     }
  //     setIsLoading(false)
  //   }

  //   fetchMovies()

  // }, [])


  if (isLoading) {
    return <ActivityIndicator />
  }


  if (error) {
    return <Text>{error?.message}</Text>
  }



  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item, index }) => <MovieListItem key={index} movie={item} />}
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
