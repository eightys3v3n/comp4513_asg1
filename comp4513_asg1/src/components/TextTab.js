import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider"; //For general plays (from browse page)
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function TextTab(props) {
    const [currPlay, setCurrPlay] = useState({});
    const plays = useContext(PlayInfoContext);

    useEffect(() => { 
        const playObj = plays.getPlayInfo(props.playID);
        if (playObj !== null) {
            setCurrPlay(playObj);
        }
    }, []);

    console.log(currPlay)

    let content;
    content = (
        <h1>Txt</h1>
    )
    
    return(
        <section>
            {content}
            <div>Array Size: {currPlay.acts.length}</div>
        </section>
    )
}

export default TextTab;