// https://stackoverflow.com/questions/59827667/how-to-implement-bezier-function-in-react-native-animation
import React, {useRef, useEffect} from 'react';
import {Animated, View, Easing, Pressable} from 'react-native';

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(timeline, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
        }),
        Animated.timing(timeline, {
          toValue: 2,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
        }),
      ]),
      // Animated.timing(timeline, {
      //   toValue: 2,
      //   useNativeDriver: true,
      //   duration: 1000,
      //   // easing: Easing.bezier(0.42, 0, 0.58, 1),
      // }),
    ).start();
  };

  useEffect(start, [timeline]);

  const rotate = timeline.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['-45deg', '45deg', '-45deg'],
  });

  return (
    <Pressable
      style={{flex: 1}}
      onPressIn={() => timeline.stopAnimation()}
      onPressOut={start}>
      <Animated.View style={{transform: [{rotate}]}}>
        <View style={{height: 200}} />
        <View style={{height: 200, alignItems: 'center'}}>
          <View style={{height: 150, width: 10, backgroundColor: 'red'}} />
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'red',
              borderRadius: 50,
            }}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};
