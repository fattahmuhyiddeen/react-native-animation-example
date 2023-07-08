import React from 'react';
import {View, Animated, PanResponder, Easing} from 'react-native';
const timeline = new Animated.ValueXY();
const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (e, g) => {
    Animated.event(
      [
        null,
        {
          dx: timeline.x,
          dy: timeline.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    )(e, g);
  },
  onPanResponderRelease: (event, gesture) => {
    Animated.timing(timeline, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
      duration: 500,
      easing: Easing.bounce,
    }).start();
  },
});
export default () => {
  const {left, top} = timeline.getLayout();

  const rotateX = top.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  const rotateY = left.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          transform: [
            {rotateY},
            {rotateX},
            {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
          ],
        }}
      />
    </View>
  );
};
