import React from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';

import './style.css';

const ChartsPage = ({ routes, data }) => {
  const dataLine = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: routes[0],
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205,20,15)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(205,20,15)',
        pointBackgroundColor: 'rgb(205,20,15)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[0],
      },
      {
        label: routes[1],
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(184, 185, 210, .3)',
        borderColor: 'rgb(35, 26, 136)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(35, 26, 136)',
        pointBackgroundColor: 'rgb(35, 26, 136)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[1],
      },
    ],
  };
  return (
    <MDBContainer className="Chart">
      <Line data={dataLine} options={{ responsive: true }} />
    </MDBContainer>
  );
};

export default ChartsPage;

ChartsPage.prototype = {
  routes: PropTypes.arrayOf(PropTypes.array),
  data: PropTypes.arrayOf(PropTypes.string),
};

ChartsPage.defaultProps = {
  routes: ['Home', 'Wallet'],
  data: [
    [1, 2, 5, 7, 30, 15, 12, 3, 65, 12, 10, 3],
    [55, 79, 3, 66, 7, 0, 1, 30, 92, 27, 63, 71],
  ],
};
