import React, {useContext, useState, useEffect} from 'react';
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details

function PlayTitleText(props) {
    const [currPlay, setCurrPlay] = useState({}); // Need to make context provider work
    const plays = useContext(PlayInfoContext); // Will be set by the 'PlayTitle.js' when selecting a Scene
    let {act,setAct} = props.information;
    let {scene,setScene} = props.information;
    let {character,setCharacter} = props.information
    let {setQuery} = props.information

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
            <div>
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
            </div>
        )
    }
    function clickAct(e) {
        if (e.target.value != act){
            setAct(e.target.value);
            setScene("SCENE I");
            setCharacter("");
        }
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
            <div>
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
            </div>
        )
    }
    function clickScene(e) {
        if (e.target.value != scene) {
            setScene(e.target.value);
            setCharacter("");
        }
    }

    function SetCharacters(props) {
        let charArr = [];

        if (props.currPlay.acts !== undefined && props.currPlay.acts !== null) {
            // let characters = props.currPlay.acts[act].scenes[scene].map(l => l.speaker);
            for (let a of props.currPlay.acts) {
                if (a.name == act) {
                    for (let s of a.scenes) {
                        if (s.name == scene) {
                            charArr = Array.from(new Set(s.speeches.map( s => s.speaker)));
                        }
                    }
                }
            }
        }

        return (
            <div>
            <select onClick={clickChar}>
                <option value=""></option>
                {charArr.map( c => {
                    if (c === character) {
                        return  (
                            <option selected value={c} key={c}>{c}</option>
                        )
                    } else {
                        return  (
                            <option value={c} key={c}>{c}</option>
                        )
                    }
                    
                })}
            </select>
            </div>
        )
    }
    function clickChar(e) {
        if (e.target.value != character) {
            setCharacter(e.target.value);
        }
    }

    // function resetCharacter() {
    //     let charArray = [];
    //     if (currPlay !== undefined && currPlay !== null) {
    //         // let characters = props.currPlay.acts[act].scenes[scene].map(l => l.speaker);
    //         for (let a of currPlay.acts) {
    //             if (a.name == act) {
    //                 for (let s of a.scenes) {
    //                     if (s.name == scene) {
    //                         charArray = Array.from(new Set(s.speeches.map( s => s.speaker)))
    //                         setCharacter(charArray[0]);
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    function highlightText(e) {
        setQuery(e.target.value);
    }

    return(
        <div className="pure-form">
            <SetActs currPlay={currPlay} act={{act, setAct}}/>
            <SetScenes currPlay={currPlay} act={act} scene={{scene,setScene}}/>
            <SetCharacters currPlay={currPlay}/>
            <input type="text" id="highlight" style={{marginLeft:"7px"}} onChange={highlightText}></input>
        </div>
    )
}

export default PlayTitleText;
