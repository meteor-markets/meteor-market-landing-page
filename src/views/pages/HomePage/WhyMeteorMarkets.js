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
  }
}));

function WhyMeteorMarkets() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Box className={classes.headBox}>
      <Typography variant="h1">Why Meteor Markets?</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
                <Typography variant="h3">Zero-fee Borrowing</Typography>
                <Typography variant="body1" style={{color:"#fff"}}>
                By leveraging Blast's native yield <br/> functionality, Meteor Markets enables <br/> borrowing at zero fees.<br/>
                Talk about risk-free leverage.
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
                <Typography variant="h3">Lending</Typography>
                <Typography variant="body1" style={{color:"#fff"}}>
                Multi-asset lending on Meteor<br/> Markets allows users to earn <br/>yield. Say no to idle capital.
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
                <Typography variant="h3">Automate</Typography>
                <Typography variant="body1" style={{color:"#fff"}}>
                By leveraging Blast's native yield <br/> functionality, Meteor Markets enables <br/> borrowing at zero fees.<br/>
                Talk about risk-free leverage.
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
