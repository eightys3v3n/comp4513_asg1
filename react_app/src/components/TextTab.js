import React, {useContext, useState, useEffect} from 'react';
import { PlayInfoContext } from './PlaysInfoContextProvider'; //For the play details
import cloneDeep from 'lodash/cloneDeep';

function TextTab(props) {
    const [currPlay, setCurrPlay] = useState({}); // Need to make context provider work
    const plays = useContext(PlayInfoContext); // Will be set by the 'PlayTitle.js' when selecting a Scene
    let {act} = props.information;
    let {scene} = props.information;
    let {character} = props.information
    let {query} = props.information

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

    function Content(props) {
        let title = "";
        let sceneTitle = "";
        let sceneStageDirection = "";
        let speechesArray = [];

        if (currPlay.acts !== undefined && currPlay.acts !== null) {
            title = currPlay.title;
            for (let a of currPlay.acts) {
                if (a.name === act) {
                    for (let sc of a.scenes) {
                        if (sc.name === scene) {
                            sceneTitle = sc.title;
                            sceneStageDirection = sc.stageDirection;
                            speechesArray = cloneDeep(sc.speeches);
                            if (character !== "") {
                                speechesArray = speechesArray.filter(c => character === c.speaker);
                            }
                            if (query !== "") {
                                speechesArray = speechesArray.map( aSpeech => {
                                    //console.log(aSpeech);
                                    aSpeech.lines = aSpeech.lines.map( aLine => {
                                        aLine = "<p>" + aLine;
                                        aLine = aLine.replaceAll(query, `<span class="highlighted">${query}</span>`);
                                        aLine = aLine + "</p>";
                                        console.log(aLine);
                                        return aLine;
                                    });
                                    return aSpeech;
                                });
                            } else {
                                speechesArray = speechesArray.map( aSpeech => {
                                    aSpeech.lines = aSpeech.lines.map( aLine => {
                                        aLine = "<p>" + aLine  + "</p>";
                                        return aLine;
                                    });
                                    return aSpeech;
                                });
                            }
                            break;
                        }
                    }
                }
            }
        }

        return (
            <section className="overflow" style={{height:"65vh"}}>
                <h1>{title}</h1>
                <h2>{act}</h2>
                <h3>{scene}</h3>
                <div>{sceneTitle}</div>
                <div><i>{sceneStageDirection}</i></div>
                {speechesArray.map(s => {
                    return (
                    <div>
                        <h4>{s.speaker}</h4>
                        {s.lines.map(a => {return ( <span dangerouslySetInnerHTML={{__html: a}}></span> )})}
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
