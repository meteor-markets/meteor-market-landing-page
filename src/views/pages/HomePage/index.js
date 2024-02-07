import React from 'react';
import HomeBanner from './HomeBanner';
import {
  Box,
} from "@material-ui/core";
import Page from "src/component/Page";
import WhyMeteorMarkets from './WhyMeteorMarkets';





function Index() {
  return (
    <Page title="home">
        <Box pb={5}>
        <HomeBanner/>
        <WhyMeteorMarkets/>
        </Box>
  </Page>
  )
}

export default Index