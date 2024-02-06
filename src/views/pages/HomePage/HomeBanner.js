import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";
import Page from "src/component/Page";


const useStyles = makeStyles((theme) => ({
    headBox:{
        padding:"8rem 0rem"
    }
  }));


function HomeBanner() {
  const classes = useStyles();

  return (
    <Page title="Swap">
    <Box className={classes.headBox}>
     <Container>
        <Typography variant="h1" style={{maxWidth:"410px"}}>Enabling Risk-free Leverage on Meteor Markets</Typography>
        <Button variant="contained" style={{minWidth:"120px",marginTop:"10px"}}>Launch App</Button>
     </Container>
    </Box>
  </Page>
  )
}

export default HomeBanner