import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCovidData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

export const useCovidData = () => {
  return useQuery('covidData', fetchCovidData);
};
