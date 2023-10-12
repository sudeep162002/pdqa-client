import {useDispatch} from 'react-redux';
import { Typography,AppBar, Toolbar,Button,Avatar } from '@material-ui/core'
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import useStyles from './style.js';
import decode from 'jwt-decode';


 const Navbar = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigation = useNavigate();
   const location = useLocation();


  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));


 useEffect(()=>{
       const token = user?.token;
       

       if(token){
             const decodedToken = decode(token);

             if(decodedToken.exp * 1000 < new Date().getTime())
             logOut();
       }

       setUser(JSON.parse(localStorage.getItem('profile')));
 },[location])

 const logOut = (e) =>{
 dispatch({type: 'LOGOUT'});
navigation('/');
setUser(null);

 }


      return (
       <AppBar className={classes.appBar} position='static' color="inherit">
             <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px" />
             <img className={classes.image} src={memoriesLogo} alt="icon" height="40px"/>
             </Link>
             <Toolbar className={classes.toolbar}>
     {
           user ?(
               <div className={classes.profile}>
                     <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                     <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                     <Button variant="contained" color="secondary" className={classes.logout} onClick={logOut}>LogOut</Button>
               </div>
           ): (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
           )
     }
             </Toolbar>
             
       </AppBar>   
      )
}

export default Navbar;