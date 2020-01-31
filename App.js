import React from 'react';
import { SafeAreaView } from 'react-native';
import ShareTimeline from './examples/ShareTimeline';
import Loop from './examples/Loop';
import List from './examples/List';
import List2 from './examples/List2';
import DragDrop from './examples/DragDrop';
import ScrollViewHeader from './examples/ScrollViewHeader';
import DragDrop2 from './examples/DragDrop2';

export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    {/* <ShareTimeline /> */}
    {/* <Loop /> */}
    {/* <List /> */}
    {/* <List2 /> */}
    {/* <DragDrop /> */}
    {/* <ScrollViewHeader /> */}
    <DragDrop2 />
  </SafeAreaView>
);
