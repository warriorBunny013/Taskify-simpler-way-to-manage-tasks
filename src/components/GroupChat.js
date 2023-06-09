
import { Container, Divider,Box, TextField, Button, List, ListItem,ListItemText} from '@mui/material';


const Chat = () => {

  return (
      <>
        <Container>
            <Box>
              <List>
                <ListItem align="left">
                <ListItemText secondary="online" align="left">hello how are u?</ListItemText>
                <ListItemText secondary="online" align="right">hello?</ListItemText>
                </ListItem>
              </List>
            </Box>
            <Divider/>
            <Box>
              <TextField variant='outlined'/>
              <Button variant="contained">Send</Button>
            </Box>
        </Container>
      </>
  );
}

export default Chat;