import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  MenuItem,
  Box,
  Container,
  Menu,
  withStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from './../../component/Logo'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
const StyledMenu = withStyles((theme) => ({
  paper: {
    width: '188px !important',
    background: theme.palette.background.dark1,
    borderRadius: 0,
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))
const StyledMenuItem = withStyles((theme) => ({
 
}))(MenuItem)
const headersData = [
 
  {
    label: 'Twitter',
    href: '/twitter',
  },
  {
    label: 'Medium',
    href: '/medium',
  },
  {
    label: 'Discord',
    href: '/discord',
  },
]


const useStyles = makeStyles((theme) => ({
  menuButton: {
    color: theme.palette.text.black,
    borderBottom: '5px solid transparent',
    padding: '0px 0px 0px 0px',
    margin:'0px 0px 0px 74px',
    fontSize: ' 18px',
    fontWeight: ' 500 !important',
    minWidth: '100px',
    lineHeight: '24px',
    borderRadius: 0,
    letterSpacing: '1px',
    height: '100%',
    '@media (max-width: 900px)': {
      fontStyle: 'normal',
      letterSpacing: '-0.6px',
      lineHeight: '24px',
      color: '#FFF',
      padding: '15px !important',
      height: '51px',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '&:active': {
      borderBottom: '5px solid #fb6621',
    },
    '&:hover': {
      borderBottom: '5px solid #fb6621',
    },
  },
  toolbar: {
    padding: '0',
    background: theme.palette.background.dark1,
    marginTop: '40px',
    borderRadius: '7px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    height: '90px',
    '@media (max-width: 900px)': {
      paddingLeft: '75px',
      paddingRight: '20px',
      height: '100%',
    },
  },
  maindrawer: {
    height: '100%',
    background: '#0c0731',
    width: '260px',
  },
  logoDrawer: {
    paddingLeft: '10px',
    width: '80px',
    marginBottom: '30px',
  },
  drawerContainer: {
    padding: '20px 0px ',
    height: '100%',
    background: '#242538',
    paddingLeft: ' 20px !important',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawericon: {
    color: '#000',
    position: 'absolute',
    top: '0px',
    right: '-0px',
    fontSize: '25px',
  },
  logoImg: {
    width: '75px',
    // height: '44.5px',
    margin: ' 14px 15px 11px 0px',
    objectFit: 'contain',
    '@media (max-width: 500px)': {
      margin: ' 11px 1px 3px 0px',
      width: '52px',
    },
  },
  menuMobile: {
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: '-0.6px',
    lineHeight: '1.75',
    color: '#fff',
    // borderBottom: "1px solid #3e3e3e",
    padding: '16px',
    '@media (max-width: 500px)': {
      padding: '7px 0',
      width: '100%',
    },
  },
  menuMobile2: {
    fontSize: '14px',
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: '-0.6px',
    lineHeight: '1.75',
    color: '#000',
    padding: '10px 5px !important',
    '@media (max-width: 500px)': {
      padding: '7px 0',
      width: '100%',
    },
  },
  paper1: {
    background: 'black',
    color: 'white',
  },
  containerHeight: {
    height: '100%',
    background: theme.palette.background.dark1,
  },
  mainHeader: {
    // border: '1px solid #e1e1e1',
    height: '60px',
    display: 'flex',
    padding: 0,
    overflow: 'hidden',
    // boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
    marginTop: '16px',
    borderRadius: '7px',
    justifyContent: 'space-between',
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
  },
  search: {
    height: '31px',
    position: 'relative',
    color: '#ABABAB',
    borderRadius: '100px',
    backgroundColor: '#E6E6E6',
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#ececec',
      border: '1px solid #300760',
    },
    marginLeft: 20,
    width: '140px',
    maxWidth: '257px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '180px',
    },
  },
  searchIcon: {
    fontSize: '16px',
    padding: theme.spacing(0, 2),
    color: '#000000',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    fontSize: '16px',
  },
  wallet: {
    fontSize: '14px',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: '21px',
    color: '#fff',
    border: '1px solid #ec0066',
    padding: '0 15px',
    background: '#ec0066',
    borderRadius: '50px',
    height: '31px',
    '&:hover': {
      background: '#fff',
      color: '#ec0066',
    },
    '@media (max-width: 900px)': {
      marginLeft: '12px',
      marginTop: '12px',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: '13px',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100px',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
  submenu: {
    borderTop: '3px solid #300760',
    top: '25px !important',
  },
  logoBox: {
    height: '100%',
    // borderRight: ' 1px solid #e1e1e1',
    '& a': {
      height: '100%',
      '& div': {
        height: '100%',
      },
    },
  },
  signinBox: {
    height: '100%',
    borderLeft: ' 1px solid #e1e1e1',
    [theme.breakpoints.down('md')]: {
      borderLeft: ' none',
    },
    '& button': {
      width: '100%',
      height: '100%',
      color: '#707070',
      fontSize: '12px !important',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        color: '#fff',
        height: ' 60px',
      },
      '& label': {
        fontSize: '14px !important',
      },
    },
  },
  desktopbtn: {
    color: theme.palette.text.black,
  },
  navcolor: {
    color: theme.palette.text.black,
  },
}))

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const {
    menuMobile,
    menuButton,
    menuButton1,
    logoBox,
    toolbar,
    drawerContainer,
    drawericon,
    logoDrawer,
    containerHeight,
    mainHeader,
  } = useStyles()
  const history = useHistory()

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  })
  const [applicationCheck, setApplicationCheck] = useState('')
  const { mobileView, drawerOpen } = state

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }))
    }

    setResponsiveness()

    window.addEventListener('resize', () => setResponsiveness())
  }, [])

 let userToken = sessionStorage.getItem('token')
  useEffect(() => {

    setApplicationCheck(userToken)
  }, [userToken])


  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  const displayDesktop = () => {
    return (
      <Container maxWidth="lg" className="p-0">
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            style={{ paddingLeft: '0px', height: '100%',textAlign:"center" }}
          >
            <Grid item xs={10} style={{ height: '100%' }}>
              {getMenuButtons()}
            </Grid>
            <Grid item xs={2} style={{ height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="end" style={{height:"100%"}}>
              <Button variant="contained" style={{minWidth:"145px"}} onClick={() => history.push("/overview")}>Launch App</Button>
            </Box>
             
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    )
  }

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }))
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }))

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: 'right',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img className={logoDrawer} src="images/logo.png" alt="" />
            {getDrawerChoices()}
            {/* {signin} */}
          </div>
        </Drawer>

        <div>{femmecubatorLogo}</div>

        <Grid container alignItems="center">
          
          <Grid item xs={3}>
            <IconButton
              className={drawericon}
              {...{
                edge: 'start',
                color: 'inherit',
                'aria-label': 'menu',
                'aria-haspopup': 'true',
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: '#fff', fontSize: '30px' }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    )
  }

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile}>{label}</MenuItem>
          </Button>
        </>
      )
    })
  }


  const femmecubatorLogo = (
    <Box className={logoBox}>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  )


  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: Link,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        </>
      )
    })
  }

  return (
    <>
      <AppBar
        position={history.location.pathname !== '/' ? 'relative' : 'relative'}
        elevation={0}
        // style={{ backgroundColor: "#ccc0", border: "none" }}
        // style={
        //   history.location.pathname !== '/'
        //     ? { backgroundColor: '#f5f7fa' }
        //     : { backgroundColor: '#f5f7fa' }
        // }
      >
        <Container
          maxWidth={history.location.pathname !== '/' ? 'fixed' : 'fixed'}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        {applicationCheck && (
          <>
            <StyledMenuItem className="menutext">
              <Link to="/dashboard">Dashboard</Link>
            </StyledMenuItem>
            <StyledMenuItem className="menutext">
              <Link onClick={handleClickOpen}>Disconnect</Link>
            </StyledMenuItem>
          </>
        )}
        {!applicationCheck && (
          <StyledMenuItem className="menutext">
            <Link to="/login">Login</Link>
          </StyledMenuItem>
        )}
      </StyledMenu>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Disconnect'}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            style={{ color: '#000' }}
          >
            Are you sure you want to Disconnect?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push('/')
              window.sessionStorage.removeItem('token')
              window.sessionStorage.removeItem('userType')
              setOpen(false)
            }}
            color="primary"
            style={{ color: '#5a86ff' }}
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
