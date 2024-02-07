import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import TopBar from './TopBar'
import HomeFooter from './HomeFooter'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#0B0B0F',
  },
  MainLayout: {
    minHeight: 'calc(100vh - 415px)',
    // paddingTop: "50px",
    backgroundColor: '#0B0B0F',
  },
}))

const MainLayout = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  console.log(history.location)
  return (
    <div className={classes.root}>
      <TopBar />
      <div
        style={
          history.location.pathname !== '/'
            ? { display: 'block' }
            : { display: 'none' }
        }
      ></div>

      <div className={classes.MainLayout}>{children}</div>
      <HomeFooter />
    </div>
  )
}

export default MainLayout
