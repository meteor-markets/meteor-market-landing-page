import React from "react";
import { Grid, Box, Typography, makeStyles, Button } from "@material-ui/core";
import Page from "../Component/Page";
import Footer from "../HomeLayout/Footer";

const useStyles = makeStyles((theme) => ({
  headBox: {
    borderRadius: "9px",
    background: "#1C1C1C",
    padding: "35px 35px",
    [theme.breakpoints.down("xs")]:{
        padding: "35px 15px",
    }
  },
  numberBox: {
    backgroundColor: "#212123",
    borderRadius: "9px",
    padding: "80px 24px",
    textAlign: "center",
    border:"1px solid rgba(255, 255, 255, 5%)"
  },
  smallText: {
    color: "rgba(255,255,255,80%)",
  },
}));

const Claim=()=> {
  const classes = useStyles();

  return (
    <Page title="Claim" >
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"60vh",width:"90%"}}>
    <img src="data:image/jpeg;base64,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"/>
    </Box>
      {/*
    
    <Box className={classes.headBox}>
        <Box mb={5}>
          <Typography variant="h2" className="textColorFormate">
            Claim
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Pending Money Markets claims are shown below
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box className={classes.numberBox}>
              <Typography variant="h3" className="textColorFormate">
                LGE
              </Typography>
              <Box mt={5}>
                <Typography style={{ marginBottom: "10px" }}>
                  <span className={classes.smallText}>Total Claim</span>
                </Typography>
                <Typography variant="h5" className="textColorFormate">
                  0.00 Money Market
                </Typography>
              </Box>
              <Box mt={5}>
                <Typography style={{ marginBottom: "10px" }}>
                  <span className={classes.smallText}>Est. Available</span>
                </Typography>
                <Typography variant="h5" className="textColorFormate">
                  0.00 Money Market
                </Typography>
              </Box>
              <Box mt={7}>
                <Button variant="contained" style={{ minWidth: "170px" }}>
                  Claim
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box className={classes.numberBox}>
              <Typography variant="h3" className="textColorFormate">
                LGE Bonus
              </Typography>
              <Box mt={5}>
                <Typography style={{ marginBottom: "10px" }}>
                  <span className={classes.smallText}>Total Claim</span>
                </Typography>
                <Typography variant="h5" className="textColorFormate">
                  0.00 Money Market
                </Typography>
              </Box>
              <Box mt={5}>
                <Typography style={{ marginBottom: "10px" }}>
                  <span className={classes.smallText}>Est. Available</span>
                </Typography>
                <Typography variant="h5" className="textColorFormate">
                  0.00 Money Market
                </Typography>
              </Box>
              <Box mt={7}>
                <Button variant="contained" style={{ minWidth: "170px" }}>
                  Claim
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    */}
      <Footer />
    </Page>
  );
}
export default Claim
