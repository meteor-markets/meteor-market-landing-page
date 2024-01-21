import React from 'react'
import {
    Grid,
    Box,
    Typography,
    makeStyles,
    Divider,
    Icon,
    Button,
  } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    depositMainBox:{
        backgroundColor:"#1C1C1C",
        borderRadius:"9px",
        padding:"20px"
    }
  }));


export default function Deposit() {
  const classes = useStyles();

  return (
    <Box className={classes.depositMainBox}></Box>
  )
}
