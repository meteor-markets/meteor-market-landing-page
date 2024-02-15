import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    headBox:{
        padding:"8rem 0rem"
    }
  }));


function HomeBanner() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.headBox}>
     <Container>
        <Typography variant="h1" style={{maxWidth:"410px"}}>Enabling Risk-free Leverage on Meteor Markets</Typography>
        <Button variant="contained" style={{minWidth:"120px",marginTop:"10px"}} onClick={() => history.push("/overview")}>Launch App</Button>
     </Container>
    </Box>
  )
}

export default HomeBanner