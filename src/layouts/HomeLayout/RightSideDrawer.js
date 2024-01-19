/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { FaSignOutAlt, FaUserEdit, FaUser,FaArrowRight } from "react-icons/fa"
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import WalletConnect from "src/component/WalletConnect";

const sections = [
  // {
  //   title: "Login",
  //   href: "/login",
  //   icon: FaSignInAlt,
  // },
  // {
  //   title: "Profile",
  //   href: "/view-profile",
  //   icon: FaUser,
  // },
  // {
  //   title: "Edit Profile",
  //   href: "/edit-profile",
  //   icon: FaUserEdit,
  // },

  {
    title: "View on EXplorer",
    href: "",
    icon: FaArrowRight,
  },
  {
    title: "Disconnect",
    href: "/dashboard",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    position: "absolute",
    right: 0,
    top: 30,
    width: 150,
    color: "#fff",
    // background: theme.palette.primary.main,
  },
  avatar: {
    cursor: "pointer",
    width: 50,
    height: 50,
    "@media (max-width: 767px)": {
      width: "50px",
      height: "50px",
    },
  },
  btnHover: {
    "& button": {
      "& :hover": {
        backgroundColor: "White",
        color: "#000",
      },
    },
  },
  avatarBig: {
    cursor: "pointer",
    width: 150,
    height: 150,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  //   .MuiButton-root:hover
  connectWalletBtn:{
    marginRight:"25px",
    paddingLeft:"25px",
    paddingRight:"25px",
    "& :hover": {
      backgroundColor: "transparent",
      // border:"2px solid #fff"
    },
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState("");

  console.log("sdjfkasdf",openConnectWallet)

  const ViewProfileFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.viewProfile,
        method: "GET",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.data?.responseCode === 200) {
        setUserDetails(res.data.result);
      }
    } catch (error) {
      console.log("error --->>", error);
    }
  };
  useEffect(() => {
    ViewProfileFunction();
  }, []);

  const confirmationHandler = () => {
    history.push("/login");
    window.localStorage.removeItem("token");
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Disconnect"}
          desc={"Do you want to Disconnect ?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#fff" }}
        />
      )}
      <PerfectScrollbar
        options={{ suppressScrollX: true }}
        className="walletbox"
      >
        <Box>
          <Typography variant="h6" align="left" className="textColorFormate">
            {userDetails?.name}
          </Typography>
          <Typography
            variant="caption"
            className="textColorFormate"
            align="left"
          >
            {userDetails?.email}
          </Typography>
        </Box>
        <div style={{ borderBottom: "1px solid White", height: 10 }}></div>
        <Box pt={1}>
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <Button
                fullWidth
                className={classes.btnHover}
                style={{
                  justifyContent: "left",
                  color: "white",
                  textTransform: "capitalize",
                }}
                key={i}
                onClick={() => {
                  section.title === "Disconnect"
                    ? setOpen(true)
                    : history.push(section.href);
                }}
              >
                <Icon color="white" /> &nbsp;&nbsp;{section.title}
              </Button>
            );
          })}
        </Box>
      </PerfectScrollbar>
      
    </Box>
  );

  return (
    <>
      {/* <Avatar
        src={
          data?.imageUrl ? data?.imageUrl : "/images/profilePlaceholder.jpeg"
        }
        className={classes.avatar}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      /> */}
    <Button px={3} variant="contained" className={classes.connectWalletBtn} onClick={() => {
          // setRightBar(!rightBar);
          setOpenConnectWallet(true);
        }}>
    Connect
    </Button>
    {openConnectWallet && (
        <>
        <WalletConnect  
         open={openConnectWallet}
         handleClose={() => setOpenConnectWallet(false)}/>
      </>
      )}
      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
