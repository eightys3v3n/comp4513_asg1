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
            <div><span className="bold">Likely Composition Date:</span> {currPlay.likelyDate}</div>
            <div><span className="bold">Genre:</span> {currPlay.genre}</div>
            <div><span className="bold">Description:</span> {currPlay.desc}</div>
            <div><span className="bold">Links: </span>
                <a href={currPlay.wiki} target="_blank" rel="noopener noreferrer">Wikipedia</a>;
                <a href={currPlay.gutenberg} target="_blank" rel="noopener noreferrer">Gutenberg</a>;
                <a href={currPlay.shakespeareOrg} target="_blank" rel="noopener noreferrer">Shakespeare Org</a>
            </div>
        </section>
    )
}

export default DetailsTab;
