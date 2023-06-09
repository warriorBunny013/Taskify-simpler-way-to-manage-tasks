import * as React from 'react';
import { styled} from '@mui/material/styles';
import {CssBaseline,Box,Container} from '@mui/material';
import Main from './components/Main'
import Header from './components/Header';
import {Routes,Route, useNavigate } from 'react-router-dom';
import Form from './components/Form'
import Signup from './components/Signup'
import { useSelector,useDispatch } from 'react-redux';
import { loginUser,setLoading } from './Reducers/authReducer';
import { auth } from "./firebase";
import Landing from './components/LandingPage';
import Overview from './components/Overview';
import { useEffect } from 'react';
import GroupChat from './components/GroupChat'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));





export default function App() {
  const user = useSelector((state) => state.auth);

  const navigate=useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
   
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
        navigate('/dashboard')
      } else {
        // navigate('/')
        dispatch(setLoading(false));
        console.log("User is not logged in.");
        
      }
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

 

  return (<>
    <CssBaseline />
  
      
    <Box sx={{ display: 'flex', minHeight:"100vh",backgroundColor:"#fff"}}>

     
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        {/* Todolist main content routing here */}
           <Routes>

         
          <Route exact path="/" element={<Landing/>}/>
          {user.user && <Route path="/dashboard" element={<Overview/>}/>}
          {user.user && <Route path="/dashboard/tasks" element={<> <Header/><Main/></>}/>}
          {user.user &&<Route path="/dashboard/chats" element={<> <Header/><Container maxWidth="md"><GroupChat/></Container></>}/>}
          {user.user && <Route  path="/dashboard/teams" element={<> <Header/><Container maxWidth="md">Team members</Container></>}/>}
          <Route  path="/login" element={<Form/>}/>
          <Route  path="/register" element={<Signup/>}/>
          <Route  path="/*" element={<h1>PAGE NOT FOUND</h1>}/>
        
           </Routes>
      </Box>
    </Box>

    </>
  );
}