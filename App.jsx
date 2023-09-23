import React from 'react';
import {SafeAreaView} from 'react-native';
import ShareTimeline from './examples/ShareTimeline';
import Loop from './examples/Loop';
import List from './examples/List';
import List2 from './examples/List2';
import ScrollViewHeader from './examples/ScrollViewHeader';
import DragDrop from './examples/DragDrop';
import DragDrop2 from './examples/DragDrop2';
import DragDrop3 from './examples/DragDrop3';
import DragDrop4 from './examples/DragDrop4';
import Perspective from './examples/Perspective';
import TouchableScale from './examples/TouchableScale';
import Slider from './examples/Slider';
import SliderTab from './examples/SliderTab';
import SnapCarousell from './examples/SnapCarousell';
import Pendulum from './examples/Pendulum';
import FlatListWithGesture from './examples/FlatListWithGesture';

export default () => (
  <SafeAreaView style={{flex: 1}}>
    {/* <Loop /> */}
    {/* <List /> */}
    {/* <List2 /> */}
    {/* <ScrollViewHeader /> */}

    {/* Drag, after drop it bounce back to original place */}
    {/* <DragDrop /> */}

    {/* Drag, after drop continue where it stop */}
    {/* <DragDrop2 /> */}

    {/* Drag drop with boudary  */}
    {/* <DragDrop3 /> */}

    {/* Drop auto bounce to nearest hotspot */}
    {/* <DragDrop4 /> */}

    {/* <TouchableScale /> */}
    {/* Object sharing same timeline */}
    {/* <ShareTimeline /> */}

    {/* Not done yet */}
    {/* <Perspective /> */}

    {/* Slider with animted tab */}
    {/* <SliderTab /> */}
    {/* <Pendulum /> */}

    {/* Flatlist with item can swipe (not ready yet) */}
    {/* <FlatListWithGesture /> */}
    <SnapCarousell />
  </SafeAreaView>
);
