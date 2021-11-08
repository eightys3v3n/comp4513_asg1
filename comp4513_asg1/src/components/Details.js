import React from 'react';
import { TabLayout, Tab } from './TabLayout.js';


function Details(props) {
  function test(props) {
    return (
      <h3>Test Component {props.label} Content</h3>
    );
  }

  return (
    <TabLayout selected={props.selected} setSelected={props.setSelected}>
      <Tab key="Tab1"
           label="Tab 1"
           component={test} />
      <Tab key="Tab2"
           label="Tab 2"
           component={test} />
      <Tab key="Tab3"
           label="Tab 3"
           component={test} />
    </TabLayout>
  );
}

export default Details;
