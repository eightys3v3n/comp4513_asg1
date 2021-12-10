import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useState } from 'react';
import AboutModalContent from './AboutModalContent';
import Button from '@mui/material/Button';

function Header(props) {
  let src = `${process.env.PUBLIC_URL}/paint-bucket.png`;
  let [modal, setModal] = useState(false);

  function openAbout(e) {
    setModal(true);
  }

  function closeAbout(e) {
    setModal(false);
  }

  return (
    <section id='Header'>
      <div className="pure-g grey">
        <div className="pure-u-5-24">
          <Link to="/"><img className="logo" alt="Logo - Paint Bucket" src={src}/></Link>
        </div>
        <div className="pure-u-11-24 "></div>
        <div className="pure-u-6-24">
          <ul>
            <Button variant='contained' color='inherit' onClick={openAbout} className="AboutOpenButton pure-button">About</Button>
            <ReactModal ariaHideApp={false} className="ModalSize gradient-reverse" closeTimeoutMS={200} isOpen={modal}  shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}>
              <Button variant='contained' color='inherit' className="AboutModalCloseButton" onClick={closeAbout}>Close</Button>
              <AboutModalContent/>
            </ReactModal>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;