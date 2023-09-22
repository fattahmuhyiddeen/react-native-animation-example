// Not completed yet
import React, {useRef} from 'react';
import {
  Animated,
  FlatList,
  View,
  useWindowDimensions,
  PanResponder,
  Text,
} from 'react-native';

const data = Array(10).fill();

const Row = () => {
  const leftButtons = ['green', 'yellow', 'grey'];
  const timeline = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        timeline.setOffset({
          x: timeline.x._value,
          y: timeline.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: timeline.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        timeline.flattenOffset();
        Animated.spring(timeline, {
          useNativeDriver: false,
          toValue: {x: g.moveX, y: 0},
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        backgroundColor: 'red',
        height: 80,
        transform: [{translateX: timeline.x}],
      }}>
      <Text>test</Text>
    </Animated.View>
  );
};

export default () => {
  // useEffect(() => {
  //   Animated.timing(timeline, {toValue: 1, useNativeDriver: true}).start();
  // }, [timeline]);
  const {width, height} = useWindowDimensions();

  return (
    <View>
      <FlatList
        data={data}
        pagingEnabled
        scrollEventThrottle={1}
        ItemSeparatorComponent={<View style={{height: 6}} />}
        renderItem={() => <Row />}
      />
    </View>
  );
};
