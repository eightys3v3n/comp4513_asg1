import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useState } from 'react';
import AboutModalContent from './AboutModalContent';

function Header(props) {
  let src = `${process.env.PUBLIC_URL}/paint-bucket.png`;
  let [modal, setModal] = useState(false);

  function openAbout(e) {
    console.log("About button clicked");
    setModal(true);
  }

  function closeAbout(e) {
    console.log("Close about");
    setModal(false);
  }

  return (
    <section id='Header'>
      <div className="pure-g grey">
        <div className="pure-u-5-24 ">
          <Link to="/"><img className="logo" alt="Logo - Paint Bucket" src={src}/></Link>
        </div>
        <div className="pure-u-11-24 "></div>
        <div className="pure-u-6-24 ">
          <ul>
            <li><Link to="/DetailsPage">Details Page</Link></li>
            <button onClick={openAbout} className="AboutOpenButton pure-button">About</button>
            <ReactModal className="ModalSize" closeTimeoutMS={200} isOpen={modal}  shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}>
              <button className="AboutModalCloseButton pure-button" onClick={closeAbout}>Close</button>
              <AboutModalContent/>
            </ReactModal>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;