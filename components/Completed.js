import { StyleSheet, Text, View, Animated, Image, Pressable, Easing } from 'react-native'
import React, { useRef, useEffect } from 'react'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


export default function Completed({isCompleted, handleRestart}) {
    const animatedScale = useRef(new Animated.Value(0)).current;
    const animatedBtnScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isCompleted) {
        Animated.sequence([
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.elastic(5),
            }),
            Animated.timing(animatedBtnScale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bounce,
            }),
        ]).start();
    }
    }, [isCompleted]);

    const onPress = () => {
        Animated.sequence([
            Animated.timing(animatedScale, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.back(),
            }),
            Animated.timing(animatedBtnScale, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,

            }),
        ]).start(() => {
            handleRestart();
        });
    }

  return (
    isCompleted ? (
    <Animated.View style={[styles.container, {transform: [{scale: animatedScale}]}]}>
    <Image source={require("../assets/trophy.png")} style={styles.image} />
    <AnimatedPressable style={[styles.restartBtn, {transform: [{scale: animatedBtnScale}]}]} onPress={onPress}>
        <Text style={styles.Text}>Restart</Text>
    </AnimatedPressable>
    </Animated.View>
    ) : null
  );
}

const styles = StyleSheet.create({
    container: {
     width: "100%",
     height: "100%",
     justifyContent: "center",
     alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        resizeMode: "contain",
      
    },
    restartBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 260,
        height: 160,
        padding: 16,
        backgroundColor: "violet",
        borderRadius: 24,
    },
    Text: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
    }
})