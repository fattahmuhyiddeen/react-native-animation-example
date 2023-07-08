import React, {useEffect, useRef} from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';

export default () => {
  const {width} = useWindowDimensions();
  const timeline1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(timeline1, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  }, [timeline1]);

  const rotate = timeline1.interpolate({
    inputRange: [0, 2],
    outputRange: ['-30deg', '30deg'],
  });

  const translateX = timeline1.interpolate({
    inputRange: [0, 2],
    outputRange: [0, width - 100],
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
          transform: [{rotate}],
        }}
      />
      <Animated.View
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
          marginTop: 200,
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
