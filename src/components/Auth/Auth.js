import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input.js';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon.js';
import {signin,signup} from '../../actions/auth.js';

import useStyles from './style.js';

const initialState = {firstName:"",lastName:"",email:"",password:"",confirmpassword:""};

const Auth = () => {
    const classes = useStyles();
   const [showPassword,setShowPassword] = useState(false)

    const [isSignup,setIsSignup] = useState(false);

    const [formData,setFormData] = useState(initialState);

const disPatch =  useDispatch();
const navigation = useNavigate();

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword) => !prevShowPassword);   
    }
 
    const handleSubmit = (e) =>{
 e.preventDefault();

  console.log(formData);
 if(isSignup){
       
       disPatch(signup(formData,navigation));
 }else{
       console.log('signin action dispatched');
   disPatch(signin(formData,navigation));
 }
  
    }

    const handleChange = (e) =>{
setFormData({...formData,[e.target.name]:e.target.value});
    }

  const SwitchMode = () => {
     setIsSignup((prevIsSignup) => !prevIsSignup);
     handleShowPassword(false);
  }

  const googleSuccess = (res) =>{
   const result = res?.profileObj;//optional chaining operator don't give error if profileObj is not defined . it simply assign undefined if properties does not exist;
   const token = res?.tokenId;
   try {
         disPatch({type: 'AUTH',data: {result,token}});
         //navigation.push() method after login of page come back to user on home page.
       navigation('/');
   } catch (error) {
     console.log(error);    
   }

  }

const googleFailure = (error) =>{
      console.log(error);
console.log("Google Sign In was unsuccesful. Try Again Later");
}

      return (
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}  elevation={3}>
            <Avatar className={classes.avatar} >
        <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                {
                      isSignup && (
                            <>
  <Input name="firstName" label="First Name" handleChange={handleChange}  half /> 
                           
<Input name="lastName" label="Last Name" handleChange={handleChange}  half /> 
                        </>  
                      )
                }
                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {
                      isSignup && <Input name="confirmpassword" label="Repeat password" handleChange={handleChange} type="password" />
                }
              <Button type="sumbmit" fullWidth={true} variant="contained" color="primary" className={classes.submit}>{isSignup ? "Sign Up":"Sign In" }</Button>
                  </Grid>
                  
                  <GoogleLogin 
                  clientId="158658306186-00mor34kll5rber39s5b7utoq7vgc1f6.apps.googleusercontent.com" 
                  render={(renderProps) =>(
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"> Google Sign In</Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure} 
                  cookiePolicy='single_host_origin'/> 
                   
       
        <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={SwitchMode}>
                      {isSignup ?"Already have an account ? sign In":"Don't have an account ? Sign Up"} 
                      </Button>    
              </Grid>
        </Grid>

            </form>
                  </Paper>  
          </Container>
      )
}

export default Auth;
