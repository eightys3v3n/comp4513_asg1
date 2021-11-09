import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider"; //For general plays (from browse page)
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function TextTab(props) {
    const [currPlay, setCurrPlay] = useState({}); // Need to make context provider work
    const plays = useContext(PlayInfoContext); // Will be set by the 'PlayTitle.js' when selecting a Scene
    const act = 1; // Will be set by the 'PlayTitle.js' when selecting an Act

    // Need to make context provider work
    useEffect(() => {
        let useEffectPlay = plays.getPlayInfo(props.playID);

        if (useEffectPlay &&
            Object.keys(useEffectPlay).length !== 0 &&
            Object.getPrototypeOf(useEffectPlay) === Object.prototype)
        {
            setCurrPlay(useEffectPlay);
        } else {
            plays.fetchPlayInfo(props.playID)
            .then(useEffectPlay => {
                setCurrPlay(useEffectPlay);
            });
        }
    }, []);

    //console.log(currPlay)

    let content;
    content = (
        <h1>Act </h1>
    )
    
    return(
        <section>
            {content}
            <div>Array Size: {currPlay.id}</div>
        </section>
    )
}

export default TextTab;