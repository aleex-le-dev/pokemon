import { StyleSheet, View } from "react-native";
import StartBtn from "./components/StartBtn";
import { pokemonsArr } from "./data";
import Card from "./components/Card";
import { useState, useEffect } from "react";

export default function App() {
  const [shouldDistribute, setShouldDistribute] = useState(false); // pour afficher les cartes
  const [openedCards, setOpenedCards] = useState([]); // pour stocker les cartes ouvertes
  const [clearedCards, setClearedCards] = useState([]); // pour stocker les cartes effacées

  const handleCardPress = (card) => { // pour ouvrir une carte
      setOpenedCards((prev) => [...prev, card]); 
    }
  
    const evaluate = () => {
      if (openedCards[0].type === openedCards[1].type) {
        setClearedCards((prev) => [...prev, openedCards[0].type]);
        setOpenedCards([]);
      }else{
        setOpenedCards([]);
      }
    }

    useEffect(() => {
      if (openedCards.length === 2) {
        setTimeout(evaluate, 500);
      }
    }, [openedCards]);

  const startGame = () => {
    setShouldDistribute(true);
  } // pour démarrer le jeu

  return (
    <View style={styles.container}>
      {shouldDistribute && pokemonsArr.sort(() => Math.random() - 0.5).map((card, index) => ( 
        <Card 
          key={card.id} 
          index={index} 
          shouldDistribute={shouldDistribute} 
          card={card}
          onPressCard={handleCardPress}
          isFlipped={!!openedCards.find(el => el.id === card.id)}
          isCleared={!!clearedCards.includes(card.type)}
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