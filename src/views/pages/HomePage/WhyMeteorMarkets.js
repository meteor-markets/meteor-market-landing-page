import React from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headBox: {
    backgroundColor:"#343434",
    padding:"20px",
    "& h1":{
        textAlign:"center"
    },
    "& h3":{
        marginBottom:"1.5rem"
    }
  },
}));

function WhyMeteorMarkets() {
  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.headBox}>
      <Typography variant="h1">Why Meteor Markets?</Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
                <Typography variant="h3">Zero-fee Borrowing</Typography>
                <Typography variant="body1" style={{color:"#fff"}}>
                By leveraging Blast's native yield <br/> functionality, Meteor Markets enables <br/> borrowing at zero fees.<br/>
                Talk about risk-free leverage.
                </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default WhyMeteorMarkets;
