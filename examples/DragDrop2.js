import React, {useEffect, useRef} from 'react';
import {Animated, PanResponder} from 'react-native';

export default () => {
  const timeline = useRef(new Animated.ValueXY());
  const coordinate = useRef({x: 0, y: 0});
  useEffect(() => {
    timeline.current.addListener(v => (coordinate.current = v));
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      timeline.current.setOffset({
        x: coordinate.current.x,
        y: coordinate.current.y,
      });
    },
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
