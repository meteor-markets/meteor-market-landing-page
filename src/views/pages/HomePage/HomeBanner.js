import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    headBox:{
        padding:"8rem 0rem"
    }
  }));


function HomeBanner() {
  const classes = useStyles();

  return (
    <Box className={classes.headBox}>
     <Container>
        <Typography variant="h1" style={{maxWidth:"410px"}}>Enabling Risk-free Leverage on Meteor Markets</Typography>
        <Button variant="contained" style={{minWidth:"120px",marginTop:"10px"}}>Launch App</Button>
     </Container>
    </Box>
  )
}

export default HomeBanner