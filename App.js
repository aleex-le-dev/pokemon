import { StyleSheet, View } from "react-native";
import StartBtn from "./components/StartBtn";
import { pokemonsArr } from "./data";
import Card from "./components/Card";

export default function App() {
  return (
    <View style={styles.container}>
      {pokemonsArr.map((card) => (
        <Card key={card.id} />
      ))}
      <StartBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});