import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './Welcome.style';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
    
  const {t} = useTranslation();


  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 30,
        duration: 300,
        friction: 4,
        tension: 30,
        useNativeDriver: false,
      }),
      Animated.spring(animatedValue, {
        toValue: 15,
        duration: 300,
        friction: 4,
        tension: 30,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        animate(); // Loop the animation
      }
    });
  };

  useEffect(() => {
    animate(); // Start the animation initially
  }, []);

  const containerStyle = {
    transform: [{ translateY: animatedValue }],
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Text style={styles.mainText}>{t("welcomeText")}</Text>
    </Animated.View>
  );
};

export default Welcome;
