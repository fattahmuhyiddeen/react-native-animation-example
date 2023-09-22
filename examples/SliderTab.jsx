import React, {useRef} from 'react';
import {
  Animated,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const data = [
  {
    title: 'Slide A',
    children: <View style={{height: 500, backgroundColor: 'red'}}></View>,
  },
  {
    title: 'Slide B',
    children: <View style={{height: 200, backgroundColor: 'green'}}></View>,
  },
];

export default () => {
  const timeline = useRef(new Animated.Value(0)).current;

  const {width} = useWindowDimensions();

  const translateX = timeline.interpolate({
    inputRange: [0, width * data.length],
    outputRange: [0, width],
    extrapolate: 'clamp',
  });

  const tabChildren = useRef([]);

  const onScrollEnd = e => {
    const activeIndex = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5), 0),
      data.length,
    );

    console.log(activeIndex);
  };

  const tabWidth = 100 / data.length + '%';

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {data.map(({title}) => (
          <Text key={title} style={{flex: 1, textAlign: 'center'}}>
            {title}
          </Text>
        ))}
      </View>
      <View style={{width: '100%'}}>
        <Animated.View
          style={{
            height: 5,
            width: tabWidth,
            backgroundColor: 'green',
            transform: [{translateX}],
          }}
        />
      </View>
      <FlatList
        horizontal
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={{width: '100%'}}
        scrollEventThrottle={1}
        keyExtractor={i => i.title}
        renderItem={({item, index}) => (
          <View style={{width}}>
            <View ref={ref => (tabChildren.current[index] = ref)}>
              {item.children}
            </View>
          </View>
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: timeline}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    </View>
  );
};
