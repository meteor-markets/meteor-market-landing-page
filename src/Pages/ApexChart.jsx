import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const ApexChart = () => {

 
  const data = [
    { name: '18 March', borrow: 4000, supply: 2400 },
    { name: '20 March', borrow: 3000, supply: 1398 },
    { name: '22 March', borrow: 2000, supply: 9800 },
    { name: '24 March', borrow: 2780, supply: 3908 },
    { name: '26 March', borrow: 1890, supply: 4800 },
    { name: '28 March', borrow: 2390, supply: 3800 },
    { name: '30 March', borrow: 3490, supply: 4300 },
    { name: '2 April', borrow: 1890, supply: 4800 },
    { name: '4 April', borrow: 2390, supply: 3800 },
    { name: '6 April', borrow: 3490, supply: 4300 },
    { name: '8 April', borrow: 3490, supply: 4300 },
  ];

  return (
    <div>
      <div id="chart">
        
      <AreaChart width={900} height={350} data={data}
      margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3A281C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3A281C" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#5F3424" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#5F3424" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="0.1 0.9" />
      <Tooltip />
      <Area type="monotone" dataKey="borrow" stroke="#c4410b" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="supply" stroke="#fa6f23" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
