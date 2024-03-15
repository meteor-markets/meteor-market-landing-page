import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [selection, setSelection] = useState('one_year');

  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    },
    {
      name: "series-2",
      data: [23, 12, 54, 61, 32, 56, 81, 19]
    },
    {
      name: "series-3",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    }
  ];

  const updateData = (timeline) => {
    setSelection(timeline);
    switch (timeline) {
        case 'one_month':
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              new Date('28 Jan 2013').getTime(),
              new Date('27 Feb 2013').getTime()
            )
        break;
        case 'six_months':
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              new Date('27 Sep 2012').getTime(),
              new Date('27 Feb 2013').getTime()
            )
        break;
        case 'one_year':
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              new Date('27 Feb 2012').getTime(),
              new Date('27 Feb 2013').getTime()
            )
        break;
      case 'ytd':
        // ...
        break;
        case 'all':
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              new Date('23 Jan 2012').getTime(),
              new Date('27 Feb 2013').getTime()
            )
        break;
      default:
    }
  };

  return (
    <div>
      <div id="chart">
        
        <div id="chart-timeline">
          <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
