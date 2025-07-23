import { StyleSheet, View } from "react-native";
import StartBtn from "./components/StartBtn";
import { pokemonsArr } from "./data";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import Completed from "./components/Completed";

export default function App() {
  const [shouldDistribute, setShouldDistribute] = useState(false); // pour afficher les cartes
  const [openedCards, setOpenedCards] = useState([]); // pour stocker les cartes ouvertes
  const [clearedCards, setClearedCards] = useState([]); // pour stocker les cartes effacées

  const [isCompleted, setIsCompleted] = useState(false);

  const [restart, setRestart] = useState(false);
  const [cards, setCards] = useState([]);

  const handleCardPress = (card) => { // pour ouvrir une carte
      setOpenedCards((prev) => [...prev, card]); 
    }

    const handleRestart = () => {
      setClearedCards([]);
      setOpenedCards([]);
      setIsCompleted(false);
      setRestart(true);
      setCards(pokemonsArr.sort(() => Math.random() - 0.5));
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
     if (clearedCards.length === 6) {
      setTimeout(() => {
        setIsCompleted(true);
      }, 500);
    }
    }, [clearedCards]);

    useEffect(() => {
      if (openedCards.length === 2) {
        setTimeout(evaluate, 500);
      }
    }, [openedCards]);

  const startGame = () => {
    setShouldDistribute(true);
    setCards(pokemonsArr.sort(() => Math.random() - 0.5));
  } // pour démarrer le jeu

  return (
    <View style={styles.container}>
      {shouldDistribute && cards.map((card, index) => ( 
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
      <Completed isCompleted={isCompleted} handleRestart={handleRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});