import React, {useContext, useState, useEffect} from 'react';
import { PlaysContext } from "./PlaysContextProvider";

function TextTab(props) {
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
            
        </section>
    )
}

export default TextTab;
