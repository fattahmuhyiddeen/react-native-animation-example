import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, View} from 'react-native';

export default ({
  knobSize = 50,
  activeBackgroundColor = 'yellow',
  nonActiveBackgroundColor = 'blue',
}) => {
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
        style={{backgroundColor: nonActiveBackgroundColor}}
        onLayout={e => setWidth(e.nativeEvent.layout.width - knobSize)}>
        <Animated.View
          style={{
            width: left,
            backgroundColor: activeBackgroundColor,
            top: 0,
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        />
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            height: knobSize,
            width: knobSize,
            backgroundColor: 'red',
            left,
          }}
        />
      </View>
    </View>
  );
};
