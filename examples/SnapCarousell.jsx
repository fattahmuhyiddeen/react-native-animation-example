import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

const sampleData = [
  {
    title: 'Slide A',
    children: (
      <View style={{backgroundColor: 'red'}}>
        <Text>first page</Text>
        <Text>aaaaa</Text>
        <Text>bbbbb</Text>
        <Text>ccccc</Text>
        <Text>dddddd</Text>
      </View>
    ),
  },
  {
    title: 'Slide B',
    children: (
      <View style={{backgroundColor: 'green'}}>
        <Text>middle page</Text>
        <Text>aaaaa</Text>
        <Text>bbbbb</Text>
        <Text>ccccc</Text>
        <Text>dddddd</Text>
        <Text>eeee</Text>
        <Text>ffffff</Text>
        <Text>gggggg</Text>
      </View>
    ),
  },
  {
    title: 'Slide C',
    children: (
      <View style={{backgroundColor: 'blue'}}>
        <Text>last page</Text>
        <Text>aaaaa</Text>
        <Text>bbbbb</Text>
        <Text>ccccc</Text>
        <Text>dddddd</Text>
        <Text>eeee</Text>
        <Text>ffffff</Text>
      </View>
    ),
  },
];

export default ({loop = true, data = sampleData}) => {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const animHeight = useRef(new Animated.Value(100)).current;
  const [activeIndex, setActiveIndex] = useState(loop ? 1 : 0);
  const renderedData = loop ? [data[2], ...data, data[0]] : data;

  const onScrollEnd = e => {
    const stoppedIndex = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5), 0),
      renderedData.length,
    );
    if (loop) {
      let jumpIndex = stoppedIndex;
      if (!stoppedIndex) {
        jumpIndex = renderedData.length - 2;
        scrollToIndex(jumpIndex);
      } else if (stoppedIndex === renderedData.length - 1) {
        jumpIndex = 1;
        scrollToIndex(jumpIndex);
      }
      setActiveIndex(jumpIndex);
    } else setActiveIndex(stoppedIndex);
  };

  const scrollToIndex = (index, animated = false) => {
    ref.current.scrollToIndex({animated, index});
  };

  return (
    <View style={{width: '100%'}}>
      <Animated.View style={{height: animHeight}}>
        <FlatList
          ref={ref}
          horizontal
          data={renderedData}
          pagingEnabled
          initialScrollIndex={loop ? 1 : 0}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          scrollEventThrottle={1}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
          // keyExtractor={i => i.title}
          getItemLayout={(_, i) => ({
            length: width,
            offset: width * i,
            index: i,
          })}
          renderItem={p => (
            <Page {...p} {...{width, activeIndex, animHeight}} />
          )}
        />
      </Animated.View>
      <View style={styles.bulletContainer}>
        {data.map((_, i, a) => {
          let isActive = (loop ? i + 1 : i) === activeIndex;
          if (loop && !activeIndex) isActive = i === a.length - 1;
          // if (loop && activeIndex === a.length - 1) isActive = i === 0;
          return (
            <Pressable
              onPress={() => scrollToIndex(loop ? i + 1 : i)}
              style={{
                ...styles.bullet,
                opacity: isActive ? 1 : 0.4,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const Page = ({width, item, index, activeIndex, animHeight}) => {
  const [height, setHeight] = useState(1);
  useEffect(() => {
    if (activeIndex === index) {
      Animated.spring(animHeight, {
        toValue: height,
        useNativeDriver: false,
        duration: 100,
      }).start();
    }
  }, [activeIndex, height, index, animHeight]);
  return (
    <View style={{width}}>
      <View onLayout={e => setHeight(e.nativeEvent.layout.height)}>
        {item.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bullet: {
    height: 30,
    width: 30,
    backgroundColor: 'orange',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'black',
  },
  bulletContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
  },
});
