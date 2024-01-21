/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button, Tooltip
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { FaSignOutAlt, FaUserEdit, FaUser, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import WalletConnect from "src/component/WalletConnect";
import ConnectWallet from "../../component/ConnectWalletPopUp/index";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils/index.js";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { toast } from "react-toastify";
import { FetchCoinList } from "src/APIconfig/ApiEndPoint";
import Web3 from "web3";

const sections = [

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
    width: 180,
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
  connectWalletBtn: {
    marginRight: "25px",
    padding: "8px 40px",
    "& :hover": {
      backgroundColor: "transparent",
      // border:"2px solid #fff"
    },
  },
}));

const NavBar = () => {
  const { account, library, chainId } = useWeb3React();
  const user = useContext(UserContext);

  const handleDesconnect = () => {
    setRightBar(false);
    user?.disconnectWallet();
  };
  console.log("account", account);
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [getBalance, setGetBalance] = useState();
  const [CoinName, setCoinName] = useState();

  console.log("sdjfkasdf", CoinName);
  const FetchCoin = async () => {
    const response = await FetchCoinList()
    if (response?.length > 0) {
      let filterData = response?.filter((ele) => ele?.chainId == chainId)
      console.log("response1", account, chainId, filterData[1], response);

      setCoinName(filterData[1])
    }
  }
 

  const confirmationHandler = () => {
    history.push("/login");
    window.localStorage.removeItem("token");
  };
  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setGetBalance(balanceImETH)
    FetchCoin();

    console.log("balanceImETH", balanceImETH);
  };

  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);
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
            {CoinName?.CoinName}
          </Typography>
          <Typography
            variant="caption"
            className="textColorFormate"
            align="left"
          >

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
                // onClick={() => {
                //   section.title === "Disconnect"
                //     ? setOpen(true)
                //     : history.push(section.href);
                // }}

                onClick={() => {
                  section.title === "Disconnect"
                    ? handleDesconnect()
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
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" pr={2}>
      {CoinName?.coinImage &&
        <img src={CoinName?.coinImage} alt="image" style={{width:"30px"}} />
      }
      <Typography style={{
        marginLeft: "5px",
        color: "#fff",
        cursor: "pointer",
      }}>{getBalance && getBalance}  <span>{CoinName?.coinName}</span>
      </Typography>
      </Box>

      {account ? (
        <Button
          px={3}
          variant="contained"
          className={classes.connectWalletBtn}
          // onClick={handleDesconnect}
          onClick={() => {
            setRightBar(!rightBar);
          }}
        >
          {/* {account} */}
          {sortAddress(account)}
          <Tooltip title="Copy">
            <CopyToClipboard text={account}>
              <FileCopyIcon
                style={{
                  marginLeft: "5px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                fontSize="small"
                onClick={() => toast.info("Copied", {
                  position: toast.POSITION.BOTTOM_RIGHT
                })}
              />
            </CopyToClipboard>
          </Tooltip>
        </Button>
      ) : (
        <Button
          px={3}
          variant="contained"
          className={classes.connectWalletBtn}
          onClick={() => {
            // setRightBar(!rightBar);
            setOpenConnectWallet(true);
          }}
        >
          Connect
        </Button>
      )}

      {openConnectWallet && (
        <WalletConnect open={openConnectWallet}
          handleClose={() => setOpenConnectWallet(false)} />
        /* <ConnectWallet
          open={openConnectWallet}
          handleClose={() => setOpenConnectWallet(false)}
        /> */
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
    </Box>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
