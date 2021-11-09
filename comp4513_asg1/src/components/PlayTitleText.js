import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider"; //For general plays (from browse page)
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function PlayTitleText(props) {
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

    function SetActs(props) {
        let acts = [];

        if (props.currPlay.acts !== undefined && props.currPlay.acts !== null) {
            acts = props.currPlay.acts;
        }

        return (
            <select onClick={clickAct}>
                {acts.map( a => {
                    if (a.name === act) {
                        return  (
                            <option selected value={a.name} key={a.name}>{a.name}</option>
                        )
                    } else {
                        return  (
                            <option value={a.name} key={a.name}>{a.name}</option>
                        )
                    }
                    
                })}
            </select>
        )
    }
    function clickAct(e) {
        setAct(e.target.value);
    }

    function SetScenes(props) {
        let scenesArr = [];

        if (props.currPlay.acts !== undefined && props.currPlay.acts !== null) {
            for (let a of props.currPlay.acts) {
                if (a.name == act) {
                    scenesArr = a.scenes.map( s => s.name);
                }
            }
        }

        return (
            <select onClick={clickScene}>
                {scenesArr.map( s => {
                    if (s === scene) {
                        return  (
                            <option selected value={s} key={s}>{s}</option>
                        )
                    } else {
                        return  (
                            <option value={s} key={s}>{s}</option>
                        )
                    }
                    
                })}
            </select>
        )
    }
    function clickScene(e) {
        setScene(e.target.value);
    }

    return(
        <div>
            <SetActs currPlay={currPlay} act={{act, setAct}}/>
            <SetScenes currPlay={currPlay} act={act} scene={{scene,setScene}}/>
        </div>
    )
}

export default PlayTitleText;