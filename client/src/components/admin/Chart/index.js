import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import { GoogleLogin } from 'react-google-login';
import queryReport from './queryReport';

import './style.css';

const PagePath = async () => {
  const data = await queryReport('ga:pagePath');
  return data;
};
const EventsAction = async () => {
  const data = await queryReport('ga:eventAction');
  return data;
};

const initAuth = () =>
  window.gapi.auth2.init({
    client_id:
      '65637092858-8nm8i0t7151g09jth8u148sgsbkufaih.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
  });
const checkSignedIn = () =>
  new Promise((resolve, reject) => {
    initAuth()
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance(); // returns the GoogleAuth object
        resolve(auth.isSignedIn.get()); // returns whether the current user is currently signed in
      })
      .catch((error) => {
        reject(error);
      });
  });

const ChartsPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [pathData, setPathData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  const displayResults = (firstDat, secondData) => {
    const path = [];
    const views = [];
    const event = [];
    const clicks = [];
    // eslint-disable-next-line no-unused-vars
    let elementIndex = 0;
    const firstResult = firstDat.result.reports[0].data.rows;
    const secondResult = secondData.result.reports[0].data.rows;
    firstResult.forEach((row, index) => {
      if (row.dimensions[0] === '/') {
        path.push('الرئيسية');
      } else if (row.dimensions[0] === '/login') {
        path.push('الدخول');
      } else if (row.dimensions[0] === '/signup') {
        path.push('التسجيل');
      } else if (row.dimensions[0] === '/wallet') {
        path.push('المحفظة');
      } else if (row.dimensions[0] === '/bank') {
        path.push('البنوك');
      } else if (row.dimensions[0] === '/settings') {
        path.push('الإعدادات');
      } else if (!path.includes('أخرى')) {
        path.push('أخرى');
        elementIndex = index;
      } else {
        // eslint-disable-next-line no-return-assign
        return (views[elementIndex] += row.metrics[0].values[0]);
      }
      views.push(row.metrics[0].values[0]);
    });
    secondResult.forEach((row) => {
      event.push(`${row.dimensions[0]} : ${row.metrics[0].values[0]}`);
      clicks.push(row.metrics[0].values[0]);
    });
    setPathData({
      labels: path,
      datasets: [
        {
          label: 'زوار الصفحات',
          data: views,
          backgroundColor: [
            'rgba(255, 134,159,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(255, 218, 128,0.4)',
            'rgba(113, 205, 205,0.4)',
            'rgba(170, 128, 252,0.4)',
            'rgba(255, 177, 101,0.4)',
            'rgba(190, 20,159,0.4)',
            'rgba(98,  182, 10,0.4)',
            'rgba(25, 218, 128,0.4)',
            'rgba(19,22,119,0.4)',
            'rgba(200,21,45,0.4)',
            'rgba(25,89,180,0.4)',
          ],
          borderWidth: 1,
          borderColor: [
            'rgba(255, 134, 159, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(255, 218, 128, 1)',
            'rgba(113, 205, 205, 1)',
            'rgba(170, 128, 252, 1)',
            'rgba(255, 177, 101, 1)',
            'rgba(190, 20,159,1)',
            'rgba(98,  182, 10,1)',
            'rgba(25, 218, 128,1)',
            'rgba(19,22,119,1)',
            'rgba(200,21,45,1)',
            'rgba(25,89,180,1)',
          ],
        },
      ],
    });
    setEventsData({
      labels: event,
      datasets: [
        {
          data: clicks,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });
  };

  useEffect(() => {
    setTimeout(
      () =>
        PagePath()
          .then((firstData) =>
            EventsAction().then((secondData) =>
              displayResults(firstData, secondData)
            )
          )
          .catch(() => console.log('Request Error')),
      1000
    );
    window.gapi.load('auth2', () =>
      checkSignedIn().then((signedIn) => {
        setIsSignedIn(signedIn);
      })
    );
  });
  return (
    <MDBContainer className="Chart">
      <Bar data={pathData} />
      <Doughnut data={eventsData} />
      {!isSignedIn && (
        <GoogleLogin
          clientId="65637092858-8nm8i0t7151g09jth8u148sgsbkufaih.apps.googleusercontent.com"
          buttonText="Login"
          cookiePolicy="single_host_origin"
        />
      )}
    </MDBContainer>
  );
};

export default ChartsPage;
