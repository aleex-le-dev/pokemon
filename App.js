import { StyleSheet, View } from 'react-native';
import Card from './components/Card';

export default function App() {
  return (
    <View style={styles.container}>
    <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
