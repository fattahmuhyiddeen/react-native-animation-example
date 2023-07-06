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
  const timeline = useRef(new Animated.ValueXY()).current;
  const {width} = useWindowDimensions();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        timeline.setOffset({
          x: timeline.x._value,
          y: timeline.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, {dx: timeline.x, dy: timeline.y}],
        {
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: (e, g) => {
        timeline.flattenOffset();
        Animated.spring(timeline, {
          useNativeDriver: false,
          toValue: {x: g.moveX > width / 2 ? width - boxSize : 0, y: g.moveY},
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: timeline.x}, {translateY: timeline.y}],
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
