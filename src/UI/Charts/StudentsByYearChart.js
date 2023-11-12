import React from "react";
import ReactApexChart from "react-apexcharts";
export class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    {
      Array.from({ length: 11 }, (_, index) => {
        const year = new Date().getFullYear() - index;
      });
    }

    this.state = {
      series: [
        {
          name: "Students",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Students by Year",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: Array.from({ length: 9 }, (_, index) => {
            const year = new Date().getFullYear() - index;
            return year;
          }).reverse(),
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
