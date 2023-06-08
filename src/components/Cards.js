
import { Box,CardContent,Typography,Button,TextField} from '@mui/material';
import React from 'react';
import ReadMoreReact from 'read-more-react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { deleteTodo,updateTodo } from '../Reducers/todoReducer';
import Modal from '@mui/material/Modal';
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

const Cards = ({tid,ttitle,tdesc,tdate,tcat}) => {
  // const users=useSelector((state)=>state.users);
  // console.log('CARD WALA CONSOLELOG'+users);
  // const [edit,setEdit]=React.useState(false);
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
  

  // const [value, setValue] = React.useState('1');
  // const [age, setAge] = React.useState('');
  // const handleChangeOptions = (event) => {
  //   setAge(event.target.value);
  // };
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const existingTodo=todos.filter(f=>f.id===tid);
  const {title,desc,date,cat}=existingTodo[0];

  const [newtitle,setNewTitle]=React.useState(title);
  const [newdesc,setNewDesc]=React.useState(desc);
  const [newdate,setNewDate]=React.useState(date);
  const [newcat,setNewCat]=React.useState(cat);
  const [completed,setCompleted]=React.useState('');
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
  
  const handleMark=()=>{
    setCompleted(!completed);
    console.log("CARDS PAGE::",completed)
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
              <Button sx={{fontSize:"10px",color:"sucess"}} onClick={handleMark} variant="outlined">Mark as Done</Button>
              <Typography> {new Date().toISOString()}</Typography>
              </Box>
        </CardContent>
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
