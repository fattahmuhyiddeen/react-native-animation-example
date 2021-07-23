import React, {useRef} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  useWindowDimensions,
} from 'react-native';

const boxSize = 50;
export default () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const {width, height} = useWindowDimensions();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: {x: 0, y: g.moveY > height / 2 ? height - boxSize - 100 : 0},
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: boxSize,
    width: boxSize,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
