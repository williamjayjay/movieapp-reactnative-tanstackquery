import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '@/api/movies';

export default function TabOneScreen() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchMovies = async () => {
      setIsLoading(true)

      try {
        const movies = await fetchTopRatedMovies()
        setMovies(movies)

      } catch (error) {
        setError(error)

      }
      setIsLoading(false)
    }

    fetchMovies()

  }, [])


  if (isLoading) {
    return <ActivityIndicator />
  }


  if (error) {
    return <Text>{error?.message}</Text>
  }



  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (

          <View>
            <Text>{item.title}</Text>
          </View>
        )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
