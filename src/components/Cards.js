
import { Box,CardContent,Typography,Button,TextField,Container,List,ListItem,ListItemText,Divider} from '@mui/material';
import React, { useEffect } from 'react';
import ReadMoreReact from 'read-more-react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { deleteTodo,updateTodo,markedTodo} from '../Reducers/todoReducer';
import Modal from '@mui/material/Modal';
import { auth, db } from '../firebase';
import {addDoc,collection,onSnapshot,serverTimestamp,where,query,orderBy} from "firebase/firestore"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #666',
  boxShadow: 24,
  p: 4,
};

const Cards = ({tmark,tid,ttitle,tdesc,tdate,tcat}) => {
  // const users=useSelector((state)=>state.users);
  // console.log('CARD WALA CONSOLELOG'+users);
  // const [edit,setEdit]=React.useState(false);
  const [marked,setMarked]=React.useState(tmark)
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const minimumLength=80;
  const idealLength=100
  const maxLength=200
  const todos=useSelector((state)=>state.todo)
  const dispatch=useDispatch();
  const handleDelete=(tid)=>{
    console.log("DELETE:: ",tid)
    dispatch(deleteTodo({id:tid}));
  }

  const handleMarked=(tid)=>{

    setMarked(!marked)
    console.log("MARKED AS COMPLETED:",tid,",",marked)
    dispatch(markedTodo({id:tid,mark:marked}))
    // dispatch(addTodo({id:tid,title:ttitle,desc:tdesc,date:tdate,cat:tcat,mark:true}))
    
  }
  
  const existingTodo=todos.filter(f=>f.id===tid);
  const {title,desc,date,cat}=existingTodo[0];

  const [newtitle,setNewTitle]=React.useState(title);
  const [newdesc,setNewDesc]=React.useState(desc);
  const [newdate,setNewDate]=React.useState(date);
  const [newcat,setNewCat]=React.useState(cat);
  const handleEdit=(id)=>{
    console.log("Edited:: ",newtitle)
    
     dispatch(updateTodo({
        id:tid,
        title:newtitle,
        desc:newdesc,
        date:newdate,
        cat:newcat,
     }))
    setOpen(false);
   
  }
  const [messages, setMessages] = React.useState([]);
  const [newMssg,setNewMssg]=React.useState("");

  const messagesRef=collection(db,"messages")
 
  useEffect(() => {
    const queryMessages = query(
 
      messagesRef,
     
      where("room", "==", tid),
    
      orderBy("createdAt")
    
    );
    
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, // eslint-disable-next-line
  []);
  


 const handleSubmitChat=async(e)=>{
  e.preventDefault();
  // console.log(newMssg)
  if(newMssg==="") return;
  await addDoc(messagesRef,{
    text:newMssg,
    createdAt:serverTimestamp(),
    user:auth.currentUser.displayName,
    room:tid

  });
  setNewMssg("")
 }
  
  return (<>
        
        <Box className="border-4" sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Box className="flex justify-between" >
          <Box sx={{display:"flex",flexWrap:"wrap"}}>
          <Typography sx={{mr:3}} mb={2} component="div" variant="h5">
            {ttitle}
          </Typography>
          <Stack mb={1} direction="row" spacing={1}>
          <Chip sx={{backgroundColor:"#ff7043",color:"#fff"}} label={tcat} />
          <Chip label={`due date: ${tdate}`} variant="outlined" />
          <Chip label="In progress" variant="outlined" />
         </Stack>

          </Box>
            <Box sx={{display:"flex",gap:1,justifyContent:"flex-end"}}>
              <EditIcon sx={{cursor:"pointer"}}  onClick={()=>setOpen(true)}/>
              <DeleteIcon sx={{cursor:"pointer"}}  onClick={()=>handleDelete(tid)}/>
            </Box>
    
          </Box>
          
         
          <Typography variant="subtitle1" color="text.secondary" component="div">
          <ReadMoreReact 
        text={tdesc}
        min={minimumLength}
        ideal={idealLength}
        max={maxLength}
        readMoreText="click here to read more"
/>

            </Typography>
            <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:"1rem"}}>
              <Button sx={{fontSize:"10px",color:"sucess"}} onClick={()=>handleMarked(tid)} variant="outlined">Mark as {tmark?"unDone":"Done"}</Button>
              <Typography> {new Date().toISOString()}</Typography>
              </Box>
        </CardContent>
        {/* <Divider/> */}
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-sm text-slate-500">Chat messages</p>
        </AccordionSummary>
        <AccordionDetails>
        <Container>
            <Box>
              {/* <h1>welcome to: {tid.uppercase()}</h1> */}
              <List>
                  {messages.map((message)=><ListItem key={message.id}><ListItemText  secondary={message.user}>{message.text}</ListItemText> </ListItem>)}
              </List>
            </Box>
            <Divider/>
            <Box className="flex flex-stretch pb-5" component="form" onSubmit={handleSubmitChat}>
              <TextField sx={{width:"100vh"}} value={newMssg} onChange={(e)=>setNewMssg(e.target.value)} variant='outlined'/>
              <Button  type="submit" variant="contained">Send</Button>
            </Box>
        </Container>
        </AccordionDetails>
        </Accordion>
       
        </Box>
      
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" mb={2} variant="h4" component="h2">
            Update Task
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
           
        <TextField value={newtitle} onChange={(e)=>setNewTitle(e.target.value)} id="outlined-basic" fullWidth multiline label="Enter Task Title" variant="outlined" />
        <TextField value={newdesc} onChange={(e)=>setNewDesc(e.target.value)} id="outlined-basic" fullWidth multiline rows={4} label="Enter Description" variant="outlined" />
        <TextField value={newdate} onChange={(e)=>setNewDate(e.target.value)} id="outlined-basic" fullWidth multiline label="Enter DueDate" variant="outlined" />
        <TextField value={newcat} onChange={(e)=>setNewCat(e.target.value)} id="outlined-basic" fullWidth multiline  label="Enter category" variant="outlined" />

          
          </Box>
          <Box mt={2} sx={{display:"flex",justifyContent:"flex-end"}}>
          <Button onClick={handleEdit}  variant="contained">Submit</Button>
          </Box>
        
        </Box>
      </Modal>
        </>
    );
}

export default Cards;
