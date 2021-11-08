import React from 'react';
import { TabLayout, Tab } from './TabLayout.js';
import Characters from './Characters';
import PlayInfoProvider from './PlaysInfoContextProvider.js';
import DetailsTab from './DetailsTab.js';
import TextTab from './TextTab.js';


function Details(props) {
  function RawDetailsTab(p) {
    return (
      <DetailsTab playID={props.playID} />
    );
  }
  function RawCharactersTab(p) {
    return (
      <Characters playID={props.playID} />
    );
  }
  function RawTextTab(p) {
    return (
      <TextTab playID={props.playID}/>
    );
  }

  return (
    <PlayInfoProvider>
    <TabLayout selected={props.selected} setSelected={props.setSelected}>
      <Tab key="Tab1"
           label="Details"
           component={RawDetailsTab} />
      <Tab key="Tab2"
           label="Characters"
           component={RawCharactersTab} />
      <Tab key="Tab3"
           label="Text"
           component={RawTextTab} />
    </TabLayout>
      </PlayInfoProvider>
  );
}

export default Details;
