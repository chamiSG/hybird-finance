import { Container, Box, Divider } from "@material-ui/core";
import "./invest.scss";
import Banner from "../../components/Banner";
import { bannerText } from "../../constants/bannerText"
import PriceCard from "src/components/PriceCard";
import Chart from "src/components/Chart";
import useMediaQuery from "@material-ui/core/useMediaQuery";


function Invest() {
  const isVerySmallScreen = useMediaQuery("(max-width: 400px)");

  return (
    <div className="invest-page">
      <Banner title={bannerText.invest} content={bannerText.content} color="light"></Banner>
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
            <PriceCard label={'Current Price'} value={15.31}></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" className="price-card-divider" flexItem />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Infinity Pool Value'} value={15.31}></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" flexItem className="price-card-divider" />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Token Holders'} value={15.31}></PriceCard>
            {!isVerySmallScreen && <Divider orientation="vertical" flexItem className="price-card-divider" />}
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <PriceCard label={'Treasury Value'} value={15.31}></PriceCard>
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={"center"} gridGap={"1rem"} pb={"10rem"}>
          <Chart></Chart>
        </Box>
      </Container>
    </div>
  );
}

export default Invest;
