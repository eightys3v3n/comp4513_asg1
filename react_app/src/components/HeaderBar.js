import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';
import Divider from '@mui/material/Divider';
import Login from './Login.js';


const pages = [];
const settings = ['Profile', 'About', 'Logout'];

//please replace this code with the state (dynamically generated from the login state) => you'll want to [Ctrl+F "testUser"]
var testUser = {
  firstname: "Mark",
  lastname: "Frezell",
  city: "Calgary",
  country: "Canada",
  picture: "https://avatars.githubusercontent.com/u/18632662?s=96&v=4",
  dateJoined: "12/10/2021"
}

const HeaderBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  if (props.userObj !== null) {
    testUser = {
      firstname: props.userObj.details.firstname,
      lastname: props.userObj.details.lastname,
      city: props.userObj.details.city,
      country: props.userObj.details.country,
      picture: props.userObj.picture.large,
      dateJoined: props.userObj.membership.date_joined
    };
  } 

  let src = `${process.env.PUBLIC_URL}/paint-bucket.png`;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleCloseProfile = () => setOpenProfile(false);

  /**
   * When user clicks "logout" in the header bar, the user is sent to the login page
   */
  const handleClick = (setting) => {
    if(setting == "About") //if the user clicks "About"
      setOpen(true);
    else if(setting == "Profile"){ //if user clicks "Profile"
      console.log("Access Profile");
      setOpenProfile(true);
    } else if(setting == "Logout"){ //if user clicks "Logout"
        /* WHEN THE USER IS LOGGING OUT, PUT IMPLEMENTATION HERE */
        //fetch() // to the callback api, then redirect to login page
        console.log(props.userObj);
        fetch('http://server.eighty7.ca:8082/logout', { credentials: 'include' });
        props.resetUserObj();
      }
    else{ //if another button is implmented, or a click goes weird
      console.log("Not sure how this got called.");
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#333',
    border: '2px solid #CCC',
    boxShadow: 24,
    p: 4,
    color: "#EEE"
  
  };

  return (
    <AppBar position="static" style={{background: '#333333'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* Profile Modal that Shows the User what  */}
            <Modal
              open={openProfile}
              onClose={handleCloseProfile}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h3">Profile</Typography>
                
                <Divider light="true" /><br/>
                
                <img src={testUser.picture} alt={testUser.firstname+" "+testUser.lastname} style={{width:"100px", height:"100px", float:"right", borderRadius:"50px"}} />
                <Typography id="modal-modal-title" variant="h6">First: {testUser.firstname}</Typography>
                <Typography id="modal-modal-title" variant="h6">Last: {testUser.lastname}</Typography>
              
                <Divider light="true"/><br/>

                <Typography id="modal-modal-title" variant="h6">City: {testUser.city}</Typography>
                <Typography id="modal-modal-title" variant="h6">Country: {testUser.country}</Typography>

                <Divider light="true"/><br/>

                <Typography id="modal-modal-title" variant="h6">Date Joined: {testUser.dateJoined}</Typography>

            </Box>
            </Modal>

            {/* About Modal that Shows the Project Details */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4">COMP 4543 - Asg1</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Complete Assignment 2 for <span style={{fontWeight:'bold'}}>COMP 4513: Web 3 - Advanced Web Development</span>
                </Typography>

                <Divider light="true"/><br/>

                <Typography variant='h6'>Team Members:</Typography>
                <Typography><a className="darkMode" href="https://github.com/eightys3v3n" target="_blank" rel="noopener noreferrer">Terrence Plunkett (tplun878@mtroyal.ca)</a></Typography>
                <Typography><a className="darkMode" href="https://github.com/PedroJanikian" target="_blank" rel="noopener noreferrer">Pedro Janikian (pjani371@mtroyal.ca)</a></Typography>
                <Typography><a className="darkMode" href="https://github.com/MarkleSparkle" target="_blank" rel="noopener noreferrer">Mark Frezell (mfrez395@mtroyal.ca)</a></Typography>
                <br/>
                <Typography variant='h6'>Code Snippet Credits:</Typography>
                <Typography><a className="darkMode" href="https://mui.com/">Material UI</a></Typography>
                <Typography><a className='darkMode' href="https://github.com/Ihatetomatoes/react-router-page-transition-css">React Router Transitions</a></Typography>
                <br />
                <Typography variant='h6'>API Links:</Typography>
                <Typography><a className="darkMode" href="http://server.eighty7.ca:8082/list" target="_blank">http://server.eighty7.ca:80822/list</a></Typography>
                <Typography><a className='darkMode' href="http://server.eighty7.ca:8082/play/alls_well_that_ends_well" target="_blank">http://server.eighty7.ca:8082/play/alls_well_that_ends_well</a></Typography>
                <Typography><a className='darkMode' href="http://server.eighty7.ca:8082/user/1" target="_blank">http://server.eighty7.ca:8082/user/1</a></Typography>
                <Typography><a className='darkMode' href="http://server.eighty7.ca:8082/login" target="_blank">http://server.eighty7.ca:8082/login</a></Typography>
                <br />
                <Typography variant='h6'>Image Credits:</Typography>
                <Typography><a className='darkMode' href="https://www.pexels.com/photo/shallow-focus-photography-of-paintbrush-102127/" target="_blank" rel="noopener noreferrer">HomePage Cover Art by Daian Gan</a></Typography>
                <Typography><a className='darkMode' href="https://iconmonstr.com/paint-bucket-9-svg/" target="_blank" rel="noopener noreferrer">Paintbucket</a></Typography>
                <Typography><a className='darkMode' href="https://iconmonstr.com/favorite-1-svg/" target="_blank" rel="noopener noreferrer">Filled Heart</a></Typography>
                <Typography><a className='darkMode' href="https://iconmonstr.com/favorite-2-svg/" target="_blank" rel="noopener noreferrer">Empty Heart</a></Typography>
            </Box>
            </Modal>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Image Logo */}
          <Link to="/"><img className="logo" alt="Logo - Paint Bucket" src={src}/></Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* This is the Box that holds the LOG IN button */}
          {/* We only log in if the user has logged out, and that is done by accessing the website. No need.
           <Box sx={{ flexGrow: 0 }}>
            <Button variant='contained' color='inherit' style={{color: "#333333"}}>
              <Link to="/Login">
                Log In
              </Link>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {/* This is the Box that holds the logged in user -  */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={testUser.firstname} src={testUser.picture} /> {/* Have image path here for the user */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu, () => {handleClick(setting)}}>
                  {/* This is how we get the key for the MenuItem in handleOpen() - https://stackoverflow.com/questions/40044861/get-key-index-on-click-es6-react */}
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
};
export default HeaderBar;
