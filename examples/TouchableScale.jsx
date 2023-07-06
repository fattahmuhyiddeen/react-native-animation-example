/* This component is to make Tinted Button when touched (like in waze) */
import React, {useRef} from 'react';
import {Animated, Pressable, View, Text} from 'react-native';

const Root = Animated.createAnimatedComponent(Pressable);

const Child = (
  <View style={{padding: 10, backgroundColor: 'red', borderRadius: 10}}>
    <Text>Press Me</Text>
  </View>
);

export default ({scale = 0.9, loading, children = Child, ...props}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaling = toValue =>
    Animated.spring(scaleAnim, {toValue, useNativeDriver: true}).start();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Root
        disabled={loading}
        onPressIn={() => scaling(scale)}
        onPressOut={() => scaling(1)}
        {...props}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          ...props.style,
          transform: [...(props.style?.transform || []), {scale: scaleAnim}],
        }}
        children={children}
      />
    </View>
  );
};
