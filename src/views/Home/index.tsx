import { Container, Box, Divider } from "@material-ui/core";
import "./home.scss";
import Banner from "../../components/Banner";
import { bannerText } from "../../constants/bannerText"
import PriceCard from "src/components/PriceCard";
import Chart from "src/components/Chart";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { ethers } from "ethers";
import { IMetrics } from "src/store/types";

function Home() {
  const isVerySmallScreen = useMediaQuery("(max-width: 400px)");

  const metrics = useSelector<IReduxState, IMetrics>(state => {
    return (state.app && state.app.metrics) || state.app.metrics;
  });

  console.log('price', metrics)

  const chartData = metrics.stakedHistorical

  return (
    <div className="home-page">
      <Banner title={bannerText.dashboard} content={bannerText.content} theme="dark"></Banner>
      <Container maxWidth="lg">
        <Box 
          display={'grid'}
          justifyContent={"center"}
          gridAutoColumns={"1fr"} 
          gridTemplateColumns={"1fr 1fr 1fr 1fr"} 
          gridRowGap={isVerySmallScreen ? "16px" : "16px"} 
          gridColumnGap={"16px"}
        >
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Current Price'} value={`$${metrics.price}`} theme="dark"></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" className="divider-light price-card-divider" flexItem />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Infinity Pool Value'} value={`$${metrics.infinityPool}`} theme="dark"></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" flexItem className="divider-light price-card-divider" />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Token Holders'} value={`${metrics.totalHolders}`} theme="dark"></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" flexItem className="divider-light price-card-divider" />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Treasury Value'} value={`$${metrics.treasury}`} theme="dark"></PriceCard>
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={"center"} gridGap={"1rem"} pb={"10rem"}>
          <Chart theme="dark" data={chartData}></Chart>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
