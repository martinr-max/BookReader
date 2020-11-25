import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';


export default function GeneralNavLinks() {

   const {isLoggedIn, role, userId, logout} = useContext(AuthContext);
 
   return (
        <React.Fragment>
             { role === 3 && isLoggedIn &&
             <NavLink to={"/admin/books"} >
                <Button color="inherit">
                    All Books
                </Button>
            </NavLink> }
            { role === 1 && isLoggedIn &&
             <NavLink to={"/" + userId + "/books"} >
                <Button color="inherit">
                    All Books
                </Button>
            </NavLink> }
            { role === 1 && isLoggedIn &&
             <NavLink to={"/" + userId + "/booklist"} >
                <Button color="inherit">
                    your Books
                </Button>
            </NavLink> }
         
          { role === 3 && !userId &&
             <NavLink to={"/admin/books"} >
                <Button color="inherit">
                    All Books
                </Button>
            </NavLink> }
          
          { role === 3 &&
             <NavLink to={"/admin/adminpanel"} >
                <Button color="inherit">
                    AdminPanel
                </Button>
            </NavLink> }
        { role === 3 && 
            <NavLink to={"/books/new"} >
                <Button color="inherit">
                    Add Book
                </Button>
            </NavLink> }
            { !userId &&
              <NavLink to="/user/login">
                  <Button color="inherit">
                      Login
                  </Button>
              </NavLink> }         
            { !userId &&
             <NavLink to="/user/signup">
                 <Button color="inherit">
                     signup
                 </Button>
             </NavLink> }
            { userId &&
             <Button className="logoutButton" onClick={logout} href="/" color="inherit">
                 Logout
             </Button>}

        </React.Fragment>
    )
}
