import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, View} from 'react-native';

export default ({knobWidth = 50}) => {
  const timeline = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const oldWidth = useRef(0);

  const min = 0;
  const cappedValue = v => (v < min ? min : v > width ? width : v);

  const jumpTo = v => {
    Animated.timing(timeline, {
      toValue: cappedValue(v),
      duration: 1,
      useNativeDriver: false,
    }).start();
  };

  const left = timeline.interpolate({
    inputRange: [min, width],
    outputRange: [min, width],
    extrapolate: 'clamp',
  });
  console.log('xxxx left', left)

  useEffect(() => {
    if (oldWidth.current) {
      const ratio = width / oldWidth.current;
      jumpTo(timeline._value * ratio);
    }
    oldWidth.current = width;
    timeline.flattenOffset();
  }, [width]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => timeline.setOffset(timeline._value),
    onPanResponderMove: Animated.event([null, {dx: timeline}], {
      useNativeDriver: false, // PanResponder doesn't support native driver yet
    }),
    onPanResponderRelease: () => timeline.flattenOffset(),
  });

  return (
    <View style={{margin: 100}}>
      <View
        style={{backgroundColor: 'blue'}}
        onLayout={e => setWidth(e.nativeEvent.layout.width - knobWidth)}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            height: knobWidth,
            width: knobWidth,
            backgroundColor: 'red',
            left,
          }}
        />
      </View>
    </View>
  );
};
