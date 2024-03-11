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
    <Page title="Claim">
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
      <Footer />
    </Page>
  );
}
export default Claim
