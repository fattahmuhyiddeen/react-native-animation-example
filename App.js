import React from 'react';
import { SafeAreaView } from 'react-native';
import ShareTimeline from './examples/ShareTimeline';
import Loop from './examples/Loop';
import List from './examples/List';
import List2 from './examples/List2';
import ScrollViewHeader from './examples/ScrollViewHeader';
import DragDrop from './examples/DragDrop';
import DragDrop2 from './examples/DragDrop2';
import DragDrop3 from './examples/DragDrop3';
import Perspective from './examples/Perspective';

export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    {/* <ShareTimeline /> */}
    {/* <Loop /> */}
    {/* <List /> */}
    {/* <List2 /> */}
    {/* <ScrollViewHeader /> */}
    {/* <DragDrop /> */}
    {/* <DragDrop2 /> */}
    {/* <DragDrop3 /> */}
    <Perspective />
  </SafeAreaView>
);
