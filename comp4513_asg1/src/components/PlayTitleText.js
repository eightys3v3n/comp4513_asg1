import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider"; //For general plays (from browse page)
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function PlayTitleText(props) {
    const [currPlay, setCurrPlay] = useState({}); // Need to make context provider work
    const plays = useContext(PlayInfoContext); // Will be set by the 'PlayTitle.js' when selecting a Scene
    let act = -1; // Will be set by the 'PlayTitle.js' when selecting an Act

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

    function SetActs(props) {
        let acts = [];

        if (props.currPlay.acts !== undefined && props.currPlay.acts !== null) {
            acts = props.currPlay.acts;
        }

        return (
            <select onClick={clickAct}>
                {acts.map( a => {
                    console.log(a.name)
                    return  (
                        <option value={a.name}>{a.name}</option>
                    )
                })}
            </select>
        )
    }

    function clickAct(e) {
        console.log(e.target.value);
    }

    function SetScenes(props) {
        let acts = [];

        if (props.currPlay.acts !== undefined && props.currPlay.acts !== null) {
            acts = props.currPlay.acts;
        }

        return (
            <select onClick={clickAct}>
                {acts.map( a => {
                    console.log(a.name)
                    return  (
                        <option value={a.name}>{a.name}</option>
                    )
                })}
            </select>
        )
    }

    let actOption = (
        <option></option>
    )

    return(
        <div>
            <SetActs currPlay={currPlay}/>
            <SetScenes currPlay={currPlay} />
        </div>
    )
}

export default PlayTitleText;