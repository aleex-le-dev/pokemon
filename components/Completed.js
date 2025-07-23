import { StyleSheet, Text, View, Animated, Image, Pressable } from 'react-native'
import React, { useRef, useEffect } from 'react'

const animatedPressable = Animated.createAnimatedComponent(Pressable);


export default function Completed({isCompleted}) {
    const animatedScale = useRef(new Animated.Value(0)).current;
    const animatedBtnScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isCompleted) {
        animatedBtnScale.sequence([
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animatedBtnScale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }
    }, [isCompleted]);

    const onPress = () => {
        animatedBtnScale.sequence([
            Animated.timing(animatedScale, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animatedBtnScale, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }

  return (
    isCompleted ? (
    <Animated.View style={[styles.container, {transform: [{scale: animatedScale}]}]}>
    <Image source={require("../assets/trophy.png")} style={styles.image} />
    <animatedPressable style={[styles.restartBtn, {transform: [{scale: animatedBtnScale}]}]} onPress={onPress}>
        <Text style={styles.Text}>Restart</Text>
    </animatedPressable>
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
      
    },
    restartBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 16,
        backgroundColor: "grey",
        borderRadius: 24,
    },
    Text: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
    }
})