import React from 'react'
import { useState } from 'react';
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core';
import Posts from '../posts/posts.js';
import Form from '../Form/Form.js';
import {getPostsBySearch} from '../../actions/posts.js';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination.jsx';

import {useNavigate,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles.js';

function useQuery(){
      return new URLSearchParams(useLocation().search);
}

 const Home = () => {

      const [CurrentId,setCurrentId] = useState(null);
      const dispatch = useDispatch();
  
      const classes = useStyles();
      const query = useQuery();
      const Navigate = useNavigate();
      const page = query.get('page') || 1;
      const searchQuery = query.get('searchQuery');
      const [search,setSearch] = useState('');
      const [tags,setTags] = useState([]);


      const handleKeyPress = (e) =>{
            if(e.keyCode === 13){
                  searchPost();
            }
      }

const handleAdd = (tag) => setTags([...tags,tag]);

const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete));
      

     
      
    const searchPost = () => {
          if(search.trim() || tags){
                dispatch(getPostsBySearch({search,tags: tags.join(',')}));
                Navigate(`/post/search/?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
          }else{
                Navigate('/');
          }
    }

      return (
            <Grow in>
            <Container maxWidth="xl"  >
                  <Grid  container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}  >
                <Grid item xs={12} sm={6} md={9} >
             <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                  <TextField name="search" variant="outlined" label="Search Experience" fullWidth value={search} onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  />
                  <ChipInput
                  style={{margin: '10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label = "Search Tags"
                  variant = "outlined"
                   />
                   <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form currentId={CurrentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (<Paper elevation={6} className={classes.pagination}>
         <Pagination page={page}/>
               </Paper>)}
               
                </Grid> 
                </Grid>
            </Container>
      </Grow>
      );
}

export default Home;


