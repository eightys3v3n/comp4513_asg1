import React, { useState } from 'react';


/**
 * Usage:
 * <TabLayout>
 *   <Tab .../>
 *   <Tab .../>
 * </TabLayout>
 *
 * Generates buttons for each tab, only renders selected tab contents.
 */
function TabLayout(props) {
  const [selected, setSelected] = useState(props.children[0].key);
  
  function changeTab(e) {
    console.log(`Changing to tab ${e.target.id}`);
    setSelected(e.target.id);
  }

  function renderButton(tab) {
    let disabled = false;

    if (selected === tab.key ||
        tab.props.disabled) {
      disabled = true;
    }

    return (
      <li key={tab.key}>
        <button id={tab.key}
                disabled={disabled}
                onClick={changeTab}>{tab.props.label}</button>
      </li>
    );
  }
  
  return (
    <div>
      <ul>
        {props.children.map(tab => renderButton(tab))}
      </ul>
      {props.children.filter(tab => tab.key === selected)}
    </div>
  );
}


/**
 * Usage:
 * <Tab key= // the id to identify the button with
 *      label= // label of the tab
 *      disabled= // true to disable button
 *      component= // the component to show when selected
 * 
 */
function Tab(props) {
  console.log(props);
  return (
    <props.component label={props.label}/>
  );
}


export {TabLayout, Tab};
