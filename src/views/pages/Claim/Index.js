import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Page from "src/component/Page";
import Footer from "src/layouts/HomeLayout/Footer";

const useStyles = makeStyles((theme) => ({
  headBox: {
    borderRadius: "9px",
    background: "#1C1C1C",
    padding: "35px",
  },
  numberBox: {
    backgroundColor: "#212123",
    borderRadius: "9px",
    padding: "50px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& h4": {
      color: "#FF9142",
      marginRight: "20px",
      maxWidth: "85px",
      textAlign: "center",
    },
  },
}));

function Index() {
  const classes = useStyles();

  return (
    <Page title="Claim">
      <Box className={classes.headBox}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box className={classes.numberBox}></Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Page>
  );
}
export default Index;
