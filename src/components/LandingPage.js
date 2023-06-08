import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box,Button,Container} from '@mui/material';
// import {  } from 'semantic-ui-react';

function Landing() {
  return (
    <> 
    <Container>
        <Box sx={{display:"flex",flexWrap:"wrap-reverse"}}>
        <Box sx={{width:"700px",height:"700px"}}>
    {/* <h1>HOME PAGE OR DING PAGE  */}
    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_kq41y3pa.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
    </Box>
    <Box sx={{width:"400px"}}>
       <h1 className='text-4xl font-bold pb-5'>TASKIFY</h1>
     <h1 className='text-xl text-slate-600'>We make task <span className='font-bold'>management</span> more engaging and easier to handle.</h1>
     <Box className='pt-10'>
     <Button  variant="contained" sx={{fontSize:"0.8rem"}}><Link to="/register">Register</Link></Button> or <Button variant='outlined'  sx={{fontSize:"0.8rem"}}><Link to="/login">Login</Link></Button>
     </Box>
    
</Box>
    </Box>
   
   
   </Container>
    

    </>
  );
}

export default  Landing;
