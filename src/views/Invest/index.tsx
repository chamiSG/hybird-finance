import { Container, Box, Divider } from "@material-ui/core";
import "./invest.scss";
import Banner from "../../components/Banner";
import { bannerText } from "../../constants/bannerText"
import { Deposit, Lock, Withdraw } from "src/components/Card";
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
          gridTemplateColumns={"1fr 1fr 1fr"} 
          gridRowGap={isVerySmallScreen ? "16px" : "4rem"} 
          gridColumnGap={"4rem"}
          pb={"10rem"}
        >
          <Box display={'flex'} alignItems={"center"}>
            <Deposit></Deposit>
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <Lock></Lock>
          </Box>
          <Box display={'flex'} alignItems={"center"}>
            <Withdraw></Withdraw>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Invest;
