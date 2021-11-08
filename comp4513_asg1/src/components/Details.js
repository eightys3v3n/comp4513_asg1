import React from 'react';
import { TabLayout, Tab } from './TabLayout.js';
import DetailsTab from './DetailsTab.js';


function Details(props) {
  function RawDetailsTab(p) {
    return (
      <DetailsTab playID={props.playID}/>
    );
  }
  function test(p) {
    return (
      <h1>This is the {p.label} Tab</h1>
    );
  }

  return (
    <TabLayout selected={props.selected} setSelected={props.setSelected}>
      <Tab key="Tab1"
           label="Details"
           component={RawDetailsTab} />
      <Tab key="Tab2"
           label="Characters"
           component={test} />
      <Tab key="Tab3"
           label="Text"
           component={test} />
    </TabLayout>
  );
}

export default Details;
