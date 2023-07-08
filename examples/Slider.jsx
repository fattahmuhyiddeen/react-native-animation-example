import React, {useRef} from 'react';
import {Animated, FlatList, View, useWindowDimensions} from 'react-native';

const data = Array(10).fill();

const boxSize = 50;

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(timeline, {toValue: 1, useNativeDriver: true}).start();
  // }, [timeline]);
  const {width, height} = useWindowDimensions();

  const position = timeline.interpolate({
    inputRange: [0, width * data.length],
    outputRange: [0, width-boxSize],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        renderItem={() => (
          <View
            style={{
              width: width - 20,
              margin: 10,
              backgroundColor: 'red',
              height: height - 100,
            }}
          />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: timeline}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 10,
          left: position,
          height: boxSize,
          width: boxSize,
          backgroundColor: 'green',
        }}
      />
    </View>
  );
};
