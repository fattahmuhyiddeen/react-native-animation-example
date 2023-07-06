import React, {useRef} from 'react';
import {Animated, PanResponder} from 'react-native';

export default () => {
  const timeline = useRef(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: timeline.current.x,
          dy: timeline.current.y,
        },
      ],
      {
        useNativeDriver: false, // PanResponder doesn't support native driver yet
      },
    ),
    onPanResponderRelease: (e, gesture) => {
      Animated.spring(timeline.current, {
        useNativeDriver: false, // cannot use native driver because using un supported style prop
        toValue: {x: 0, y: 0},
      }).start();
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        timeline.current.getLayout(),
        {height: 50, width: 50, backgroundColor: 'red'},
      ]}
    />
  );
};
