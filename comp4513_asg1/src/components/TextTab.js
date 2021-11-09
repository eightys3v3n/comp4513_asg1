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

    function Content(props) {
        let title = "";
        let sceneTitle = "";
        let sceneStageDirection = "";
        let speechesArray = [];

        if (currPlay.acts !== undefined && currPlay.acts !== null) {
            title = currPlay.title;
            for (let a of currPlay.acts) {
                if (a.name == act) {
                    for (let sc of a.scenes) {
                        if (sc.name == scene) {
                            sceneTitle = sc.title;
                            sceneStageDirection = sc.stageDirection;
                            speechesArray = sc.speeches;
                            if (character != "") {
                                speechesArray = speechesArray.filter(c => character == c.speaker);
                            }
                            break;
                        }
                    }
                }
            }
        }

        return (
            <section>
                <h1>{title}</h1>
                <h2>{act}</h2>
                <h3>{scene}</h3>
                <div>{sceneTitle}</div>
                <div><i>{sceneStageDirection}</i></div>
                {speechesArray.map(s => {
                    return (
                    <div>
                        <h4>{s.speaker}</h4>
                        <p>{s.lines}</p>
                    </div>
                    );
                })}
            </section>
        )
    }


    
    return(
        <section>
            <Content />
        </section>
    )
}

export default TextTab;