import React from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  Link,
} from "@material-ui/core";
import { RiArrowRightFill } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  footerBox: {
    backgroundColor: "#e8ebf0",
    padding: "25px",
    borderRadius: "19px",
    height:"100%",
    "& h1": {
      textAlign: "center",
      marginBottom: "3rem",
      color: "#000",
    },
    "& h3": {
      marginBottom: "1.5rem",
      color: "#000",
    },
    "& h4": {
      marginBottom: "1.5rem",
      color: "#000",
    },
    "& h5": {
      color: "#000",
      marginBottom: "15px",
        display:"flex",
        alignItems:"center"
    },
  },
}));

function HomeFooter() {
  const classes = useStyles();

  return (
    <Box mt={6} pb={5}>
      <Container>
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={5}>
            <Box className={classes.footerBox}>
              <Typography variant="h3">Learn</Typography>
              <Typography variant="h4">Explore Meteor Markets</Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                  Docs
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                  WhitePaper
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                GitHub
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Box className={classes.footerBox}>
              <Typography variant="h3">Support</Typography>
              <Typography variant="h4">Contact the Meteor Markets</Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                  FAQ
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                  Discord
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                Twitter
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
              <Typography variant="h5">
                <Link href="#" color="inherit">
                Blog
                </Link>
                <RiArrowRightFill style={{marginLeft:"5px"}}/>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomeFooter;
