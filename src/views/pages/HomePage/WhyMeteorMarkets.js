import React from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  headBox: {
    backgroundColor:"#343434",
    padding:"25px",
    borderRadius:"19px",
    "& h1":{
        textAlign:"center",
        marginBottom:"3rem"
    },
    "& h3":{
        marginBottom:"1.5rem"
    }
  },
  launchBtn:{
    minWidth:"120px",
    position:"relative",
    top:"40px"
  },
  centeredBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%', 
    color: '#fff'
  },
  gradientText: {
    fontSize: 32,
    fontWeight: "bold",
    // Assuming the gradient is from a dark orange to a lighter orange based on the button image
    background: 'linear-gradient(to right, #FC6A03, #FED8B1)', // Gradient has been set to similar colors as the button
    backgroundClip: 'text',
    textFillColor: 'transparent',
    transition: '0.3s', // Smooth transition for hover effect
    '&:hover': {
      filter: 'brightness(90%)', // Darkens the text on hover
      backgroundColor: '#FED8B1',
    },
    marginTop: 5
  },
}));

function WhyMeteorMarkets() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Box className={classes.headBox}>
      <Typography variant="h1" className={classes.gradientText}>Why Meteor Markets?</Typography>
        <Grid container spacing={8} padding={5}>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.centeredBox}>
                <Typography variant="h3">Interest-free Borrowing</Typography>
                <Typography variant="body1" style={{color:"#fff", fontSize: '16px'}}>
                We leverage Blast's native yields to unlock borrowing at zero fees.
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.centeredBox}>
                <Typography variant="h3">Lending</Typography>
                <Typography variant="body1" style={{color:"#fff", fontSize: '16px'}}>
                Multi-asset peer-to-peer lending/borrowing protocol on Blast.
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.centeredBox}>
                <Typography variant="h3">Leverage</Typography>
                <Typography variant="body1" style={{color:"#fff", fontSize: '16px'}}>
                Meteor Markets will offer the cheapest leverage opportunity on Blast.
                </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign={"center"} mt={4}>
        <Button variant="contained" className={classes.launchBtn} onClick={() => history.push("/overview")}>Launch App</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default WhyMeteorMarkets;
