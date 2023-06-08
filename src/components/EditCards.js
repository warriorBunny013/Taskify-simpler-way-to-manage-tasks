import * as React from 'react';
import {Button,Box,Typography,TextField}from '@mui/material'; 
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../Reducers/todoReducer';
// import { Link, useNavigate } from 'react-router-dom';

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

function Main() {
  
  
  const [title,setTitle]=React.useState('');
  const [desc,setDesc]=React.useState('');
  const [value, setValue] = React.useState('1');
  const [age, setAge] = React.useState('');
  const [date,setDate]=React.useState((new Date()).toString());
  const [cat,setCat]=React.useState('');

  const handleChangeOptions = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const dispatch=useDispatch();
  const todo=useSelector((state)=>state.todo);
  // console.log(users)
  // const navigate=useNavigate();
  const handleSubmit=(event)=>{
    dispatch(addTodo({id:~~(Math.random()*999),title:title,desc:desc,date:date,cat:cat}))
    setOpen(false);
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" mb={2} variant="h4" component="h2">
            Update Task
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
           
        <TextField onChange={(e)=>setTitle(e.target.value)} id="outlined-basic" fullWidth multiline label="Enter Task Title" variant="outlined" />
        <TextField onChange={(e)=>setDesc(e.target.value)}  id="outlined-basic" fullWidth multiline rows={4} label="Enter Description" variant="outlined" />
        <TextField onChange={(e)=>setDate(e.target.value)}  id="outlined-basic" fullWidth multiline label="Enter DueDate" variant="outlined" />
        <TextField onChange={(e)=>setCat(e.target.value)}  id="outlined-basic" fullWidth multiline  label="Enter category" variant="outlined" />

          
          </Box>
          <Box mt={2} sx={{display:"flex",justifyContent:"flex-end"}}>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
          </Box>
        
        </Box>
      </Modal>
    </>
  );
}

export default Main;
