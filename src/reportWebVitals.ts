type ReportWebVitalsCallback = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: ReportWebVitalsCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Example implementation of reporting web vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
