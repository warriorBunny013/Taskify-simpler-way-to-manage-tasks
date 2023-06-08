import * as React from 'react';
import {Container,Button,Box,Typography,TextField}from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import  Cards  from './Cards';
import Modal from '@mui/material/Modal';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
  const [date,setDate]=React.useState((new Date()).toString());
  const [cat,setCat]=React.useState('');

  // const handleDateChange=(e)=>{
   
  //   const datestring=(e.$D+'/'+(e.$M+1)+'/'+e.$y);
  //   setDate(datestring);
  //   console.log(date);
  // }
  const [value, setValue] = React.useState('1');
  // const [age, setAge] = React.useState('');
  // const handleChangeOptions = (event) => {
  //   setAge(event.target.value);
  // };
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
  const countTodos=todo.filter(i=>i).length;

  // const [mark,setMark]=React.useState(false);
  const ismarked=useSelector((state)=>state.todo);
  console.log("MARKED OR NOT::",ismarked)
  return (
    <>
         <Container maxWidth="md">
        <Box sx={{display:"flex",justifyContent: 'space-between',m:'2rem'}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box mb={2} sx={{border:1,zIndex:100,backgroundColor:"#fff",borderRadius: '8px', display:"flex",flexWrap:"wrap-reverse",justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={`Total-${countTodos}`} value="1" />
            {/* <Tab label="In Progress" value="2" /> */}
            <Tab label="Completed" value="3" />

          </TabList>
          <Button variant="contained"  onClick={handleOpen}><AddIcon/>Add Task</Button>
        </Box>
      {/* contents here */}
      {todo.map((t,index)=>{
         return <TabPanel value="1"> <Cards  sx={{marginBottom:"2rem"}} key={index} tid={t.id} ttitle={t.title} tdesc={t.desc} tdate={t.date} tcat={t.cat}/></TabPanel>
    
      
    }
      )}
      <TabPanel value="3"> completed task</TabPanel>
      
     
        
      </TabContext>
    </Box>
        
        </Box>
        
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
   
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" mb={2} variant="h4" component="h2">
            Add task 
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
           
        <TextField onChange={(e)=>setTitle(e.target.value)} id="outlined-basic" fullWidth multiline label="Enter Task Title" variant="outlined" />
        <TextField onChange={(e)=>setDesc(e.target.value)}  id="outlined-basic" fullWidth multiline rows={4} label="Enter Description" variant="outlined" />
        <TextField onChange={(e)=>setDate(e.target.value)}  id="outlined-basic" fullWidth multiline label="Enter DueDate" variant="outlined" />
        <TextField onChange={(e)=>setCat(e.target.value)}  id="outlined-basic" fullWidth multiline  label="Enter category" variant="outlined" />
        {/* <Box sx={{display:"flex",gap:2}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
       
              <DatePicker onChange={handleDateChange} label="Select Due Date" />
             </DemoContainer>
          </LocalizationProvider>
         <FormControl  sx={{width:"50%"}}>
           <InputLabel id="demo-simple-select-label">Age</InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChangeOptions}
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
       </Box> */}
          
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
