import React from 'react';
import {Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/Postdetails/postdetails.jsx';

import { BrowserRouter,Routes,Route ,Navigate} from 'react-router-dom';
// in place of Redirect we use Navigate.

const App = () =>{
     
      const user = JSON.parse(localStorage.getItem('profile'));

    
      return (
            <BrowserRouter>
            <Container maxWidth="xl">
                  <Navbar />
             <Routes>
                   <Route path="/" exact element={ <Navigate to="/post/"/>} />
                   <Route path="/post" exact element={ <Home />}/>
                   <Route path="/post/search" exact element={<Home /> }/>
                   <Route path="/post/:id" element={<PostDetails />}/>
                   <Route path="/auth" exact element={!user ?<Auth />  : <Navigate to="/post/" />} /> 
             </Routes>
                  
            </Container>
            </BrowserRouter>
      )
}

export default App;