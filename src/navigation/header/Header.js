import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../../context/AuthContext';
import GeneralNavLinks from './Navlinks/GeneralNavLinks';
import './Header.css';
import Search from '../searchEngine/SearchEngine';
import PersistentDrawerLeft from './Drawer/Drawer';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}))

export default function AppHeader()  {

  const {userId} = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                     onClick={handleDrawerToggle}
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {open && <PersistentDrawerLeft handleDrawerToggle={handleDrawerToggle} open={open}/>}
                    <Link to="/"><h2>BookReader</h2></Link>
                    <div className="searchInput">
                      {userId && <Search handleDrawerToggle={handleDrawerToggle} /> }
                    </div>
                    <div className="spacer"></div>
                    <div className="navLinks">
                    <GeneralNavLinks />
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
