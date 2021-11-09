import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider"; //For general plays (from browse page)
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function TextTab(props) {
    const [currPlay, setCurrPlay] = useState({}); // Need to make context provider work
    const plays = useContext(PlayInfoContext); // Will be set by the 'PlayTitle.js' when selecting a Scene
    let {act,setAct} = props.information;
    let {scene,setScene} = props.information;
    let {character,setCharacter} = props.information

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

    function Title(props) {
        let title = "";

        if (currPlay !== undefined && currPlay !== null) {
            title = currPlay.title;
            
        }

        return (
            <section>
                <h1>{title}</h1>
                <h2>{act}</h2>
                <h3>{scene}</h3>
            </section>
        )
    }


    
    return(
        <section>
            <Title />
        </section>
    )
}

export default TextTab;