import { Dimensions, View, StyleSheet, Pressable, Image } from "react-native";

const screen_Width = Dimensions.get("window").width;
const screen_Height = Dimensions.get("window").height;
const margin_vertical = 120
const margin_horizontal = 16;
const space_between_cards = 12; 
const card_width = (screen_Width - margin_horizontal * 2 - space_between_cards * 2) / 3;
const card_height = (screen_Height - margin_vertical * 2 - space_between_cards * 3) / 4;


export default function Card({pokemon}) {

    const AnimatedLeft = useRef(
        new Animated.Value(screen_Width /2 - card_width / 2));
    const AnimatedTop = useRef(
        new Animated.Value(screen_Height /2 - card_height / 2));

 return (
   <Animated.view style={[styles.container, { transform: [{ translateX: AnimatedLeft }, { translateY: AnimatedTop }] }]}>
<Pressable style={styles.cardContainer}>
<Image resizeMode="contain" source={require("../assets/pokemon_img/pokeball.png")} style={styles.card} />


</Pressable>
   </Animated.view>
 )
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