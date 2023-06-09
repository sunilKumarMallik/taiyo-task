/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from 'redux/slices/countrySlice';
import { UseFetcher } from 'api-services/axios-common';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//importing all the necessary dependance from chart
const LineGraph: React.FC = () => {
  const dateData = useSelector((state: any) => state.country.date);
  const dispatch = useDispatch();
  //update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UseFetcher('get', '/historical/all', {});
        //api calling using redux fetcher
        //here base url consist all the common url that is present inside the provided URL
        dispatch(getDate(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //function for extracting required value from fetched data
  const labelList = (value: any) => {
    let casesData = [];
    //extracting dates from fetched data as all of the fetched data have a common date
    let caseDates: any[] = [];
    if (value) caseDates = Object.keys(value);
    casesData = caseDates.map((date: any) => date);
    return casesData ? casesData : [];
  };
  const dataRequired = (value: any) => {
    let casesData = [];
    let caseDates: any[] = [];
    if (value) caseDates = Object.keys(value);
    casesData = caseDates.map((date: any) => value[date]);
    return casesData ? casesData : [];
  };
  //define the date and chart options like cases, death, and recovered
  const data = {
    labels: labelList(dateData.cases),
    datasets: [
      {
        label: 'cases',
        data: dataRequired(dateData?.cases),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'recovered',
        data: dataRequired(dateData?.deaths),
        borderColor: 'rgba(102, 208, 130)',
        backgroundColor: 'rgba(102, 208, 130, 0.8)',
      },
      {
        label: 'deaths',
        data: dataRequired(dateData?.recovered),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Chart options configuration
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        // text: 'Line Graph Example',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return (
    <div>
      <div className="flex justify-center align-middle text-xl mt-7">Graph View of Total Cases</div>
      {/* visual representation of data */}
      <div style={{ height: '65vh', width: '100%' }} className="flex justify-center align-middle">
        {dateData && <Line data={data} options={options} />}
      </div>
    </div>
  );
};

export default LineGraph;
