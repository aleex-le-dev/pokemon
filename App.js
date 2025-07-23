import { StyleSheet, View } from "react-native";
import StartBtn from "./components/StartBtn";
import { pokemonsArr } from "./data";
import Card from "./components/Card";
import { useState } from "react";

export default function App() {
  const [shouldDistribute, setShouldDistribute] = useState(false);
  const startGame = () => {
    setShouldDistribute(true);
  }

  return (
    <View style={styles.container}>
      {shouldDistribute && pokemonsArr.map((card, index) => (
        <Card 
          key={card.id} 
          index={index} 
          shouldDistribute={shouldDistribute} 
          card={card}
        />
      ))}
      {!shouldDistribute && <StartBtn startGame={startGame} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});