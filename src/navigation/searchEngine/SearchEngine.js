import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SearchInput from '../searchInput/SearchInput';

const Search = React.memo(() => {

    const [searchResult, setSearchResult] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const title = useRef('');
    const {userId} = useContext(AuthContext);

    
    const handleKeyPress = async (event) => {
        title.current = (event.target.value).toLowerCase().split("+").join();
        try {
            if(event.key === "Enter") {
                const responseData = await axios.get('http://localhost:8000/api/bookBlog/search/'
                 + userId +'/' + title.current);
                    const book = responseData.data;
                    setSearchResult(book);
                    setRedirect(true);        
            }
        } catch(err) {
            console.log(err.response.data.message)
            setRedirect(true);      
        }
    }
    
  return (
      <React.Fragment>
        <div>
            <SearchInput  onKeyPress={handleKeyPress} />
                {redirect &&
                <Redirect to={{
                    pathname: '/' + userId + '/results/' + title.current,
                    state: { results: searchResult }
                }} /> }  
        </div>
    </React.Fragment>
  );
});


export default withRouter(Search);