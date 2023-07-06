import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
const ARRAY_SIZE = 20;

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;

  useEffect(
    () =>
      Animated.timing(timeline, {
        toValue: ARRAY_SIZE,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
    [],
  );

  return (
    <>
      {Array(ARRAY_SIZE)
        .fill()
        .map((_, i) => {
          const opacity = timeline.interpolate({
            inputRange: [i, i + 1],
            outputRange: [0, 1],
          });

          return (
            <Animated.Text
              key={i}
              style={{
                opacity,
                backgroundColor: 'red',
                margin: 5,
                padding: 5,
                color: 'white',
              }}>
              {i}
            </Animated.Text>
          );
        })}
    </>
  );
};
