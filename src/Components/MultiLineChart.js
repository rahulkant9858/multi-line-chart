import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from "react-datepicker";
import "./MultiLineChart.css";
import "react-datepicker/dist/react-datepicker.css";
import linChartData from "../data/lineChart";



export default function MultiLineChart() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());



  var filteredDate = linChartData.filter(item => {
    var date = new Date(item.date);
    return (date >= new Date(startDate) && date <= new Date(endDate));
  });

  //Data Modification
  let data = [];
  let totalClicks = 0;
  let totalImpressions = 0;

  filteredDate.forEach(item => {
    data.push({
      name: item.date,
      impressions: item.impressions,
      clicks: item.clicks,
      campaign_id: item.campaign_id
    })

    totalClicks += parseInt(item.clicks);
    totalImpressions += parseInt(item.impressions);

  })


  return (
    <div>
      <div className="date-range">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className='total-count'>
        <div className='total total-clicks'>
          <p>Total Clicks</p>
          <p>{totalClicks}</p>
        </div>

        <div className='total total-impressions'>
          <p>Total Impressions</p>
          <p>{totalImpressions}</p>
        </div>
      </div>
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
