import React from "react";
import { Grid, Box, Typography, makeStyles, Container } from "@material-ui/core";
import { FaTwitter,FaGithub,FaTelegram } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  mainFooter: {
    background: "#25252F"
  }

}));

export default function HomeFooter() {
  const classes = useStyles();
  return (
    <Box className={classes.mainFooter}  mt={5}  pt={5}>
      <Container>
        <Grid container spacing={2} justifyContent="space-between" mr={2} >
          <Grid item lg={3}>
            <Box>
              <img src="images/logo.png" alt="Logo" width="100%" style={{ maxWidth: "200px" }} />
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Typography variant="h3">Learn</Typography>&nbsp;
            <a href="/overview"   className="textColorFormate"> <Typography variant="h5" className="textColorFormate">Explore Meteor Markets</Typography></a>
            <Typography variant="body1" className="textColorFormate">Docs</Typography>
            <Typography variant="body1" className="textColorFormate">WhitePaper</Typography>
            <Typography variant="body1" className="textColorFormate">GitHub</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h3">Support</Typography>&nbsp;
            <Typography variant="body1" className="textColorFormate">Contact the Meteor Markets</Typography>
            <Typography variant="body1" className="textColorFormate">FAQ  </Typography>
            <a href="https://twitter.com/MeteorMarkets" target="_blank"  className="textColorFormate"> <Typography variant="body1" className="textColorFormate">Twitter</Typography></a>
            <Typography variant="body1" className="textColorFormate">Discord</Typography>
          </Grid>
          <Grid item lg={12}>
          <div style={{ borderBottom: "2px solid white", height: 10,marginTop:"-12px" }}></div>
          </Grid>
          <Grid item lg={4}style={{color:"white"}}>© 2024 Meteor Markets, All Right Reserved.</Grid>
          <Grid item lg={6}></Grid>
          <Grid item lg={2}>
          <div style={{display:"flex", justifyContent:"space-evenly"}}>
          <a href="https://twitter.com/MeteorMarkets" target="_blank"  className="textColorFormate">  <FaTwitter style={{color:"white"}}/></a>

         
          <FaGithub style={{color:"white"}}/>
          <FaTelegram style={{color:"white"}}/>
          </div>
          </Grid>
          



        </Grid>

      </Container>
    </Box>
  );
}
