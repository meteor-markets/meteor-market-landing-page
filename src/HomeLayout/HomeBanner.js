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
        padding:"8rem 0rem",
        fontFamily:"'Saira Semi Condensed', sans-serif !important"
    }
  }));


function HomeBanner() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.headBox}>
     <Container style={{textAlign:"center"}}>
        <Typography variant="h1" style={{maxWidth:"550px",textAlign:"center",marginLeft:"auto",marginRight:"auto"}}>Enabling Interest-free Leverage on Meteor Markets</Typography>
        <Typography variant="body1" style={{maxWidth:"380px",textAlign:"center",marginLeft:"auto",marginRight:"auto",marginTop:"30px"}}>We leverage Blast's native yields to unlock borrowing at zero fees.</Typography>
        <Button variant="contained" style={{minWidth:"120px",marginTop:"30px"}} onClick={() => history.push("/overview")}>Launch App</Button>
        <Box my={5} pt={4}>
          <img src="images/home-banner-img.svg" width="100%"/>
        </Box>
     </Container>
    </Box>
  )
}

export default HomeBanner