import React from 'react';
import { SafeAreaView } from 'react-native';
import ShareTimeline from './examples/ShareTimeline';
import Loop from './examples/Loop';
import List from './examples/List';
import List2 from './examples/List2';


export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    {/* <ShareTimeline /> */}
    {/* <Loop /> */}
    {/* <List /> */}
    <List2 />
  </SafeAreaView>
);
