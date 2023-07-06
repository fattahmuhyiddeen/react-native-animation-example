import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(timeline, {toValue: 1, useNativeDriver: true}).start();
  }, [timeline]);

  return (
    <>
      {Array(20)
        .fill()
        .map((_, i) => {
          const translateY = timeline.interpolate({
            inputRange: [0, 1],
            outputRange: [i * 1 * 500, 0],
          });
          return (
            <Animated.Text
              key={i}
              style={{
                transform: [{translateY}],
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
