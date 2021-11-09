import React, {useContext} from 'react';
import { TabLayout, Tab } from './TabLayout.js';
import Characters from './Characters';
import PlayInfoProvider from './PlaysInfoContextProvider.js';
import DetailsTab from './DetailsTab.js';
import {PlaysContext} from './PlaysContextProvider.js';


function Details(props) {
  const plays = useContext(PlaysContext);
  let selectedPlay = plays.getByID(props.playID);
  let additionalInfo = false;
  
  if (!selectedPlay ||
      Object.keys(selectedPlay).length === 0 ||
      Object.getPrototypeOf(selectedPlay) !== Object.prototype) {
    console.warn(`No correct play information for selected play ${props.playID}`);
  } else {
    if (selectedPlay.filename !== "") {
      console.log(`Play has additional information ${props.playID}`);
      additionalInfo = true;
    } else {
      console.log("Play has no additional information");
    }
  }
  
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
  function test(p) {
    return (
      <h1>This is the {p.label} Tab</h1>
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
           disabled={!additionalInfo}
           component={RawCharactersTab} />
      <Tab key="Tab3"
           label="Text"
           disabled={!additionalInfo}
           component={test} />
    </TabLayout>
      </PlayInfoProvider>
  );
}

export default Details;
