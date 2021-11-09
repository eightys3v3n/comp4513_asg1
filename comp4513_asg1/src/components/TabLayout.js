import React from 'react';
import { useEffect } from 'react';

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
  
  useEffect(() => {
    if (props.selected === null) {
      props.setSelected(props.children[0].key);
    }
  }, [props, props.selected]);

  function changeTab(e) {
    console.log(`Changing to tab ${e.target.id}`);
    props.setSelected(e.target.id);
  }

  function renderButton(tab) {
    let disabled = false;

    if (props.selected === tab.key ||
        tab.props.disabled) {
      disabled = true;
    }

    return (
      <li className="tab-li" key={tab.key}>
        <button className="tab-button pure-button"
                id={tab.key}
                disabled={disabled}
                onClick={changeTab}>{tab.props.label}</button>
      </li>
    );
  }
  
  return (
    <div>
      <ul className="tab-layout">
        {props.children.map(tab => renderButton(tab))}
      </ul>
      {props.children.filter(tab => tab.key === props.selected)}
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
  return (
    <props.component label={props.label}/>
  );
}


export {TabLayout, Tab};
