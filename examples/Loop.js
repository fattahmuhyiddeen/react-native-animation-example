import React, {useEffect, useRef} from 'react';
import {View, Animated, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const roadImg = require('./road.png');

export default () => {
  const timeline1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(timeline1, {
        toValue: 2,
        useNativeDriver: true,
      }),
    ).start();
  }, [timeline1]);

  const translateX = timeline1.interpolate({
    inputRange: [0, 2],
    outputRange: [-154, -2],
  });

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={roadImg}
        style={{
          backgroundColor: 'green',
          resizeMode: 'contain',
          width: width + 200,
          height: 500,
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
