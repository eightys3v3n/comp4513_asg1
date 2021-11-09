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
            <div>Genre: {currPlay.genre}</div>
            <div>Description: {currPlay.desc}</div>
            <div>Links:
                <a href={currPlay.wiki} target="_blank" rel="noopener noreferrer">Wikipedia</a>;
                <a href={currPlay.gutenberg} target="_blank" rel="noopener noreferrer">Gutenberg</a>;
                <a href={currPlay.shakespeareOrg} target="_blank" rel="noopener noreferrer">Shakespeare Org</a>
            </div>
        </section>
    )
}

export default DetailsTab;
