import React, {useRef, useEffect} from 'react';
import {Animated, View, Easing} from 'react-native';

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(timeline, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
          // easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(timeline, {
          toValue: 2,
          useNativeDriver: true,
          duration: 500,
          // easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, [timeline]);

  const rotate = timeline.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['-45deg', '45deg', '-45deg'],
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          transform: [{rotate}],
        }}>
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
    </View>
  );
};
