import React from "react";

function AboutModalContent(props) {
    return (
        <section className="AboutModalContent flex-col">
            <h2>COMP 4543 - Asg1</h2>
            <p>Team Members:</p>
            <a href="https://github.com/eightys3v3n" target="_blank">Terrence (tplun878@mtroyal.ca)</a>
            <a href="https://github.com/PedroJanikian" target="_blank">Pedro Janikian (pjani371@mtroyal.ca)</a>
            <a href="https://github.com/MarkleSparkle" target="_blank">Mark Frezell (mfrez395@mtroyal.ca)</a>
            <p>Code Snippet Credits:</p>
            <a href="https://reactcommunity.org/react-modal/" target="_blank">React Modal</a>
            <a href="https://purecss.io/">Pure CSS</a>
            <a href="https://github.com/Ihatetomatoes/react-router-page-transition-css">React Router Transitions</a>
            <p>Image Credits:</p>
            <a href="https://www.pexels.com/photo/shallow-focus-photography-of-paintbrush-102127/" target="_blank">HomePage Cover Art by Daian Gan</a>
            <a href="https://iconmonstr.com/paint-bucket-9-svg/" target="_blank">Paintbucket</a>
            <a href="https://iconmonstr.com/favorite-1-svg/" target="_blank">Filled Heart</a>
            <a href="https://iconmonstr.com/favorite-2-svg/" target="_blank">Empty Heart</a>
        </section>
    )
}

export default AboutModalContent;