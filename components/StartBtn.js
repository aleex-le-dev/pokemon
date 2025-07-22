import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const BTN_SIZE = Dimensions.get("screen").width / 2;
const CIRCLE_SIZE = BTN_SIZE + 8;

export default function StartBtn() {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const onPress = () => {
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
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>Jouer</Text>
      </Pressable>
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
    </View>
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
    backgroundColor: "#5D3FD3",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
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