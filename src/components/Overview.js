
import { Box,Card,Container,CardContent,Typography,Button,TextField} from '@mui/material';
import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';

const Overview = () => {
 
  const todo=useSelector((state)=>state.todo);
  const countTodos=todo.filter(i=>i).length;
  console.log("OVERVIEW PAGE:",countTodos)
  
  return (<>
        <Header/>
      
         <Container maxWidth="md">
            <Box className="flex justify-between">
            <Box className="border-2 w-60 px-10 py-5">
                <Typography variant='h5'>Total Task: <span>{countTodos?countTodos:""}</span></Typography>
                <Box className="pt-5 text-lg text-slate-500">Inprogress: <span className='text-lg font-bold'>{countTodos?countTodos:""}</span></Box>
                <Box className=" text-lg text-slate-500">Completed: <span className='text-lg font-bold'>0</span></Box> 
                <Box className=" text-lg text-slate-500">overdue: <span className='text-lg font-bold'>0</span></Box> 
            </Box>
            <Box className="border-2 w-60 px-10 py-5">
                <Typography variant='h5'>Members: <span>23</span></Typography>
                <Box className="pt-5 text-lg text-slate-500">active: <span className='text-lg font-bold'>20</span></Box>
                <Box className=" text-lg text-slate-500">non-active: <span className='text-lg font-bold'>3</span></Box> 
            </Box>
            <Box className="border-2 w-60 px-10 py-5">
                <Typography variant='h5'>Progress: <span>16</span></Typography>
                <Box className="pt-5 text-lg text-slate-500">Weekly: <span className='text-lg font-bold'>10</span></Box>
                <Box className=" text-lg text-slate-500">monthly: <span className='text-lg font-bold'>6</span></Box> 
            </Box>
            </Box>
            
         </Container>
    
      
        </>
    );
}

export default Overview;
