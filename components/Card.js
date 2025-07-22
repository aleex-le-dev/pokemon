import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const MARGIN_VERTICAL = 120;
const MARGIN_HORIZONTAL = 16;
const SPACE_BETWEEN_CARDS = 12;
const CARD_WIDTH =
  (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2 - SPACE_BETWEEN_CARDS * 2) / 3;
const CARD_HEIGHT =
  (SCREEN_HEIGHT - MARGIN_VERTICAL * 2 - SPACE_BETWEEN_CARDS * 3) / 4;

export default function Card() {
  const animatedLeft = useRef(
    new Animated.Value(SCREEN_WIDTH / 2 - CARD_WIDTH / 2)
  ).current;
  const animatedTop = useRef(
    new Animated.Value(SCREEN_HEIGHT / 2 - CARD_HEIGHT / 2)
  ).current;
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: animatedLeft },
            { translateY: animatedTop },
          ],
        },
      ]}
    >
      <Pressable style={styles.cardContainer}>
        <Image
          resizeMode="contain"
          source={require("../assets/pokeball.png")}
          style={styles.card}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "absolute",
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: "powderblue",
  },
});