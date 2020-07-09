const queryReport = (name, date) =>
  window.gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: process.env.REACT_APP_VIEW_ID,
          dateRanges: [
            {
              startDate: date,
              endDate: 'today',
            },
          ],
          metrics: [
            {
              expression: 'ga:pageviews',
            },
          ],
          dimensions: [{ name }],
        },
      ],
    },
  });

export default queryReport;
