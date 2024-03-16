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
  whyChooseBox: {
    background: "#1C1C1C",
    borderRadius: "26px",
    "& h2": {
      marginBottom: "1.5rem",
      color: "#fff"
    }
  }
}));

function WhyMeteorMarkets() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Box>
        <Typography variant="h1" style={{ textAlign: "center" }}>Why Meteor Markets?</Typography>
        <Box className={classes.whyChooseBox} mt={7}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <Box p={5}>
                <Typography variant="h2">Interest-Free Borrowing</Typography>
                <Typography variant="body1" style={{ maxWidth: "380px" }}>We leverage Blast's native yields to unlock borrowing at zero fees.
                </Typography>
                <Button variant="contained" style={{ minWidth: "120px", marginTop: "30px" }} onClick={() => history.push("/overview")}>Launch App</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} style={{ display: "flex", alignItems: "center" }}>
              <img src="images/interst-free-img.svg" width="100%" />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.whyChooseBox} mt={5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={4} md={4} style={{ display: "flex", alignItems: "center" }}>
              <img src="images/lending-right.svg" width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box p={5}>
                <Typography variant="h2">Lending</Typography>
                <Typography variant="body1" style={{ maxWidth: "380px" }}>Multi-asset peer-to-peer lending/borrowing protocol on Blast.</Typography>
                <Button variant="contained" style={{ minWidth: "120px", marginTop: "30px" }} onClick={() => history.push("/overview")}>Launch App</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.whyChooseBox} mt={5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <Box p={5}>
                <Typography variant="h2">Leverage</Typography>
                <Typography variant="body1" style={{ maxWidth: "380px" }}>Meteor Markets will offer the cheapest leverage opportunity on Blast.
                </Typography>
                <Button variant="contained" style={{ minWidth: "120px", marginTop: "30px" }} onClick={() => history.push("/overview")}>Launch App</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} style={{ display: "flex", alignItems: "center" }}>
              <img src="images/leverage.svg" width="100%" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default WhyMeteorMarkets;
