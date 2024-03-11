import React from 'react'
import LandingPageTopbar from '../HomeLayout/LandingPageTopbar'
import Page from '../Component/Page'
import { Box } from '@material-ui/core'
import HomeBanner from '../HomeLayout/HomeBanner'
import WhyMeteorMarkets from '../HomeLayout/WhyMeteorMarkets'
import HomeFooter from '../HomeLayout/HomeFooter'

const LandingPage = () => {
  return (
    <Page title="home">
    <Box pb={5}>
    <LandingPageTopbar/>
    <HomeBanner/>
    <WhyMeteorMarkets/>
    <HomeFooter/>
    </Box>
</Page>
    
  )
}

export default LandingPage
