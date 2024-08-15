import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCountryCovidData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  console.log('data',data)
  return data;
};

export const useCountryCovidData = () => {
  return useQuery('countryCovidData', fetchCountryCovidData);
};
