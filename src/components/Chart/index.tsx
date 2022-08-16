import "./chart.scss";
import LineChart from 'react-apexcharts'
import useMediaQuery from "@material-ui/core/useMediaQuery";


function Chart(props: any) {

  const { title, content, theme } = props;
  const isVerySmallScreen = useMediaQuery("(max-width: 400px)");
  const isDark = theme == "dark" ? true : false;

  const options = {
    
    chart: {
      id: 'apexchart',
      toolbar: {
        show: false
      },
      stroke: {
        curve: 'smooth'
      },
    },
    colors: [isDark ? "#f5f5f5" : "#3a3a3a"],
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: isDark ? "#f5f5f5" : "#3a3a3a",
          fontSize: "13",
          fontWeight: 600,
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
      },
      categories: [1995, 1996, 1997, 1998, 1999],
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: isDark ? "#f5f5f5" : "#3a3a3a",
          fontSize: "13",
          fontWeight: 600,
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
      },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    grid: {
      borderColor: isDark ? "#f5f5f5" : "#3a3a3a33"
    }
  };

  const series = [{
    name: 'Price',
    data: [50000, 8000, 5000, 102000, 150000]
  }]

  return (
    <>
      <LineChart options={options} series={series} type="area" width={!isVerySmallScreen ? 960 : 360} height={320} />
    </>
  );
}

export default Chart;
