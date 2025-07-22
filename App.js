import { StyleSheet, View } from 'react-native';
import Card from './components/Card';
import { pokemonsArr } from './data';

export default function App() {
  return (
    <View style={styles.container}>
   {pokemonsArr.map((card) => (
    <Card key={card.id} pokemon={card} />
   ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
