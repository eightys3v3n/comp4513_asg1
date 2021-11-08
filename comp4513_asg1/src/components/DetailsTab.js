import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider";

function DetailsTab(props) {
    const [currPlay, setCurrPlay] = useState({});
    const plays = useContext(PlaysContext);
    
    useEffect(() => { 
        const playObj = plays.getByID(props.playID);
        if (playObj !== null) {
            setCurrPlay(playObj);
        }
    }, []);

    return(
        <section>
            <div>Likely Composition Date: {currPlay.likelyDate}</div>
            <div>{currPlay.genre}</div>
            <div>{currPlay.desc}</div>
            <a href={currPlay.wiki}>Wikipedia</a>
            <a href={currPlay.gutenberg}>Gutenberg</a>
            <a href={currPlay.shakespeareOrg}>Shakespeare Org</a>
        </section>
    )
}

export default DetailsTab;