/* This component is to make Tinted Button when touched (like in waze) */
import React, {useEffect} from 'react';
import {Animated, Easing, useWindowDimensions, View} from 'react-native';

export default () => {
  const translateY = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  const {height, width} = useWindowDimensions();
  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -height + 300,
            duration: 800,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            easing: Easing.in(Easing.quad),
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.timing(translateX, {
        toValue: width - 100,
        duration: 10000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 50,
          backgroundColor: 'blue',
          height: 60,
          width: 60,
          borderRadius: 60,
          transform: [{translateY},{translateX}],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'red',
          height: 50,
          width: '100%',
        }}
      />
    </View>
  );
};
