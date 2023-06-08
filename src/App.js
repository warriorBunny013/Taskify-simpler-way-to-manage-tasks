import * as React from 'react';
import { styled} from '@mui/material/styles';
import {CssBaseline,Box,Container} from '@mui/material';
import Main from './components/Main'
import Header from './components/Header';
import { BrowserRouter,Routes,Route,Link, useNavigate } from 'react-router-dom';
import EditCards from './components/EditCards';
import Form from './components/Form'
import Signup from './components/Signup'
import { useSelector,useDispatch } from 'react-redux';
import { loginUser,setLoading } from './Reducers/authReducer';
import { auth } from "./firebase";
import Landing from './components/LandingPage';
import Overview from './components/Overview';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));





export default function App() {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
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
  }, []);

  const user = useSelector((state) => state.auth);

  return (<>
    <CssBaseline />
  
      
    <Box sx={{ display: 'flex', minHeight:"100vh",backgroundColor:"#fff"}}>

     
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        {/* Todolist main content routing here */}
           <Routes>

         
          <Route exact path="/" element={<Landing/>}/>
          {user.user && <Route exact path="/dashboard" element={<Overview/>}/>}
          {user.user && <Route exact path="/dashboard/tasks" element={<> <Header/><Main/></>}/>}
          {user.user && <Route exact path="/dashboard/tasks/edit/:id" element={<> <Header/><EditCards/></>}/>}
          {user.user &&<Route exact path="/dashboard/chats" element={<> <Header/><Container maxWidth="md">Chats</Container></>}/>}
          {user.user && <Route exact path="/dashboard/teams" element={<> <Header/><Container maxWidth="md">Team members</Container></>}/>}
          <Route exact path="/login" element={<Form/>}/>
          <Route exact path="/register" element={<Signup/>}/>
          <Route exact path="/*" element={<h1>PAGE NOT FOUND</h1>}/>
        
           </Routes>
      </Box>
    </Box>

    </>
  );
}