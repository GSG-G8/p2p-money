const queryReport = (name) =>
  window.gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: '222948475',
          dateRanges: [
            {
              startDate: '2020-06-30',
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
