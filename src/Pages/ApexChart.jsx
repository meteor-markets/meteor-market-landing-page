import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const ApexChart = ({isCharActualValue}) => {

  const data = [
    { name: '18 March', borrow: 400, supply: 240 },
    { name: '20 March', borrow: 300, supply: 139 },
    { name: '22 March', borrow: 200, supply: 300 },
    { name: '24 March', borrow: 278, supply: 390 },
    { name: '26 March', borrow: 189, supply: 480 },
    { name: '28 March', borrow: 239, supply: 380 },
    { name: '30 March', borrow: 349, supply: 430 },
    { name: '2 April', borrow: 189, supply: 480 },
    { name: '4 April', borrow: 239, supply: 380 },
    { name: '6 April', borrow: 349, supply: 430 },
    { name: '8 April', borrow: 349, supply: 430 },
  ];

  return (
    <div>
      <div id="chart" style={{ width: '100%' }}>
        
      <AreaChart  width={900} height={350} data={data}
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
