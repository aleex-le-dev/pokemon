import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

const BTN_SIZE = Dimensions.get("screen").width / 2;
const CIRCLE_SIZE = BTN_SIZE + 8;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function StartBtn({startGame}) {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animatedColor = useRef(new Animated.Value(0)).current;
  const animatedTranslate = useRef(new Animated.Value(0)).current;
  // Animation de vibration pokeball
  const pokeballShake = useRef(new Animated.Value(0)).current;

  const onPress = () => {
    animatedOpacity.resetAnimation();
    animatedScale.resetAnimation();
    animatedColor.resetAnimation();
    Animated.timing(animatedTranslate, {
      toValue: Dimensions.get("screen").width,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    startGame();
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animatedScale, {
          toValue: 5,
          duration: 3000,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 3000,
          delay: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(animatedColor, {
        toValue: 7,
        duration: 14000,
        useNativeDriver: true,
      })
    ).start();

    // Animation vibration pokeball
    Animated.loop(
      Animated.sequence([
        Animated.timing(pokeballShake, { toValue: -8, duration: 40, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: 8, duration: 40, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: -6, duration: 35, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: 6, duration: 35, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: -4, duration: 30, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: 4, duration: 30, useNativeDriver: true }),
        Animated.timing(pokeballShake, { toValue: 0, duration: 30, useNativeDriver: true }),
        Animated.delay(600),
      ])
    ).start();
  }, []);

  const interpolatedColor = animatedColor.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
    outputRange: [
      "#f54242",
      "#f59842",
      "#f2f542",
      "#42f545",
      "#42f5cb",
      "#427bf5",
      "#bf42f5",
      "#f54242",
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: animatedTranslate }],
        },
      ]}
    >
      <AnimatedPressable
        style={styles.btn}
        onPress={onPress}
      >
        {/* Image pokeball en fond avec vibration */}
        <Animated.Image
          source={require("../assets/pokeball.png")}
          style={[styles.pokeballBg, { transform: [{ translateX: pokeballShake }] }]}
        />
      </AnimatedPressable>
      <Text style={styles.textBelow}>Jouer</Text>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              { translateX: -CIRCLE_SIZE / 2 },
              { translateY: -CIRCLE_SIZE / 2 },
              { scale: animatedScale },
            ],
            opacity: animatedOpacity,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: 99,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    overflow: "hidden",
  },
  pokeballBg: {
    position: "absolute",
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: 99,
    zIndex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    zIndex: 2,
  },
  textBelow: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
    textAlign: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "#5D3FD3",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});