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
    // padding:"8rem 0rem"
  },
}));

function WhyMeteorMarkets() {
  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.headBox}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default WhyMeteorMarkets;
