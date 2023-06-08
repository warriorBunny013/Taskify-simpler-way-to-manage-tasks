import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Toolbar,List,CssBaseline,Typography,Divider,IconButton,Box,ListItem,ListItemButton,ListItemIcon,ListItemText, Button, Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Reducers/authReducer';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Header() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(loginUser());
    signOut(auth);
    navigate('/')
  
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (<>
     
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed"  open={open}>
        <Box>
        <Toolbar>
       
       <IconButton
        color="inherit"
         aria-label="open drawer"
         onClick={handleDrawerOpen}
         edge="start"
         sx={{
           marginRight: 5,
           ...(open && { display: 'none' }),
         
           
         }}
       >
         <MenuIcon />
       </IconButton>
       {/* <Box sx={{display:"flex",flexDirection:"flex-end"}}></Box> */}
       <Typography variant="h6"  noWrap component="div">
        LOGO
       </Typography>
       
     </Toolbar>
        </Box>
       
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
            
          
            <ListItem  disablePadding sx={{ display: 'block' }}>
                <Link to="/dashboard" >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {text === 'Home'? <InboxIcon /> : <MailIcon />} */}
                  {/* {/* {text === 'Team Members'? <InboxIcon /> : <MailIcon />} */}
                   <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Overview" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }}>
            <Link to="/dashboard/teams">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {text === 'Home'? <InboxIcon /> : <MailIcon />} */}
                  {/* {/* {text === 'Team Members'? <InboxIcon /> : <MailIcon />} */}
                   <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Team Members" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }}>
                <Link to="/dashboard/tasks">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {text === 'Home'? <InboxIcon /> : <MailIcon />} */}
                  {/* {/* {text === 'Team Members'? <InboxIcon /> : <MailIcon />} */}
                   <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Task management" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
            <Link to="/dashboard/chats">
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {text === 'Home'? <InboxIcon /> : <MailIcon />} */}
                  {/* {/* {text === 'Team Members'? <InboxIcon /> : <MailIcon />} */}
                   <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Group chats" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          
        
        </List>
        <Divider />
         
        <Box className="flex flex-col mx-auto">
        <span className='text-lg text-slate-600'>Welcome,{user==null?"":user.username}</span>
        <Button onClick={handleLogout} sx={{fontSize:"0.7rem",  backgroundColor:"#fff"}} variant="outlined">Logout</Button>
        </Box>
           
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Main/>
      </Box> */}
    </Box>
    </>
  );
}