import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Home from '../shared/Home/home';
import AddBook from '../Admin/addBook/AddBook';
import UserBookList from '../Books/userBooksList/UserBookList';
import GeneralBookList from '../Books/GeneralBooklist/GeneralBooklist';
import SingleBookPage from '../Books/SingleBookPage/SingleBookPage';
import EditBook from '../Admin/editBook/EditBook';
import AdminPanel from '../Admin/adminPage/AdminPanel';
import AdminTable from '../Admin/AdminTable/AdminTable';
import Signup from '../auth/signup/Signup';
import Login from '../auth/login/Login';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AppHeader from '../navigation/header/Header';
import AdminLogin from '../auth/adminLogin/AdminLogin';
import SearchResultsPage from '../navigation/searchResultsPage/SearchResultsPage';



export default function MyRoutes() {
    
    const { role, userId} = useContext(AuthContext);

    let routes;
  
    if(role === 1 ) {
        routes = (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:userId/booklist" component={UserBookList} />
            <Route path="/:userId/results/:title" component={SearchResultsPage} />
            <Route path="/:userId/books" component={GeneralBookList} />
            <Route path="/book/:bookId" component={SingleBookPage} />
            <Redirect to="/user/login" component={Login} />
          </Switch>
        )} 
     else if(role === 3) {
         routes = (
           <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/books/new" component={AddBook}  />
            <Route path="/admin/books" component={GeneralBookList} />
            <Route path="/book/:bookId" component={SingleBookPage} />
            <Route path="/:userId/results/:title" component={SearchResultsPage} />
            <Route path="/admin/adminpanel"  component={AdminPanel} />
            <Route path="/books/new" component={AddBook}  />
            <Route path="/admin/admintable" component={AdminTable} />
            <Route path="/admin/edit/:bookId" component={EditBook} />
            <Redirect to="/admin/login" component={AdminLogin} />
            </Switch>
        )}
        else if(!role || userId === null) {
            routes=(
             <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user/signup" component={Signup} /> 
                <Route path="/user/login" component={Login} />
                <Route path ="/admin/adminlogin" component={AdminLogin} />

             </Switch>
        )};

       return(
        <Router>
            <AppHeader />
            {routes}
        </Router>
       );
}