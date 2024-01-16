/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import { FaUserAlt } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import NavItem from "./NavItem";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import EventIcon from "@material-ui/icons/Event";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import FilterFramesIcon from "@material-ui/icons/FilterFrames";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ContactsIcon from "@material-ui/icons/Contacts";
import { FaFirstOrder, FaCity } from "react-icons/fa";
import CategoryIcon from "@material-ui/icons/Category";
import { SiBrandfolder } from "react-icons/si";
import { BiBookContent } from "react-icons/bi";
import { FaQuestionCircle, FaStripeS } from "react-icons/fa";

const sections = [
  {
    items: [
      {
        title: "Overview",
        icon: DashboardIcon,
        href: "/",
      },

      // {
      //   title: "User Management",
      //   icon: PeopleIcon,
      //   href: "",
      //   items: [
      //     {
      //       title: "All Users",
      //       icon: FaUserAlt,
      //       href: "/all-users",
      //     },
      //   ],
      // },
     
      {
        title: "Landing",
        icon: EventIcon,
        href: "/landing",
      },
      {
        title: "Swap",
        icon: ContactsIcon,
        href: "/swap",
      },

      {
        title: "Market",
        icon: SiBrandfolder,
        href: "/market",
      },
      {
        title: "Staking",
        icon: FilterFramesIcon,
        href: "/staking",
      },
      {
        title: "Wallet",
        icon: FilterFramesIcon,
        href: "/wallet",
      },
      {
        title: "Bridge",
        icon: FilterFramesIcon,
        href: "/bridge",
      },
      {
        title: "Vault",
        icon: FilterFramesIcon,
        href: "/vault",
      },
    ],
  },
];
const sectionsBelow = [
  {
    items: [
      {
        icon: ExitToAppIcon,
        href: "/terms-and-condition",
      },
    ],
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
    boxShadow: "0px 0px 5px black",
    backgroundColor: " #253d2f",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    boxShadow: "0px 0px 5px black",
    height: "100%",
    backgroundColor: " #0B0B0F",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logoicon: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutbutton: {
    justifyContent: "space-between",
    paddingLeft: 10,
    borderRadius: 0,
    width: "60px",
    textAlign: "center",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {/* <Hidden mdDown> */}
      <Box padding={0} className={classes.logoicon}>
        <Logo
          width="180"
          style={{
            width: "200px",

            cursor: "pointer",
          }}
        />
      </Box>
      {/* </Hidden> */}
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box py={2}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
          {}
        </Box>
        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {section.items.map((itemList, i) => {
                return (
                  <Box align="left">
                    {/* <Button
                      fullWidth
                      color="primary"
                      startIcon={
                        <IoLogOutOutline
                          style={{
                            fontSize: "40px",
                            color: "White",
                          }}
                        />
                      }
                      key={i}
                      className={classes.logoutbutton}
                      style={{}}
                      onClick={handleClickOpen}
                    >
                      {itemList.title}
                    </Button> */}

                    <Dialog
                      open={open}
                      fullWidth
                      maxWidth="sm"
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <Typography
                        variant="h2"
                        align="center"
                        style={{ fontSize: "24px", color: "#fff" }}
                      >
                        Logout
                      </Typography>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          align="center"
                        >
                          Are you sure you want to logout?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          variant="contained"
                          style={{ border: "1px solid #fff" }}
                          color="primary"
                        >
                          No
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ border: "1px solid #fff" }}
                          // onClick={handleClose}
                          onClick={() => {
                            history.push({ pathname: "./" });
                          }}
                          autoFocus
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                );
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
