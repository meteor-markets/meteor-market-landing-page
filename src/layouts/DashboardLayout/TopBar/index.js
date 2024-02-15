import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  Box,
  SvgIcon,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import RightSideDrawer from "../../HomeLayout/RightSideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    backdropFilter: "blur(5px)",
    background: " #0B0B0F !important",
    boxShadow: "0px 0px 10px black",
  },
  toolbar: {
    height: 70,
    padding: "0 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  
  return (
    <AppBar
      elevation={0}
      className={clsx(classes.root, className)}
      color="inherit"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Box style={{ display: "flex" }}>
          <Hidden lgUp>
            <IconButton
              color="#00e0b0"
              onClick={onMobileNavOpen}
              style={{ marginRight: 10 }}
            >
              <SvgIcon fontSize="small">
                <MenuIcon style={{ color: "White" }} />
              </SvgIcon>
            </IconButton>
          </Hidden>
          &nbsp;&nbsp;&nbsp;
          <Hidden lgUp>
            <Box padding={0} className={classes.logoicon}>
              <img
                src="https://i.ibb.co/NtRnxg4/Kian-logo.png"
                width="180"
                alt="Navbar logo"
                style={{
                  width: "80px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Hidden>
        </Box>

        <Box>
          <RightSideDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
