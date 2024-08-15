import React from 'react';
import SideNav from '../../components/sideNav/SideNav';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCountryCovidData } from '../../hooks/useCountryCovidData';
import { useCovidData } from '../../hooks/useCovidData';

const MapPage: React.FC = () => {
  const { data: globalData, isLoading: isGlobalLoading, error: globalError } = useCovidData();
  const { data: countryData, isLoading: isCountryLoading, error: countryError } = useCountryCovidData();

  const transformGlobalData = () => {
    if (!globalData) return [];
    const cases = globalData.cases || {};
    const deaths = globalData.deaths || {};
    const recovered = globalData.recovered || {};

    const formattedData = Object.keys(cases).map(date => ({
      date,
      cases: cases[date],
      deaths: deaths[date] || 0,
      recovered: recovered[date] || 0
    }));

    return formattedData;
  };

  const globalChartData = transformGlobalData();

  if (isGlobalLoading || isCountryLoading) return <div>Loading...</div>;
  if (globalError) return <div>An error occurred while fetching global data</div>;
  if (countryError) return <div>An error occurred while fetching country data</div>;

  return (
    <div className="flex h-screen">
      <SideNav title="Charts & Maps">
            <div className='flex-1 flex flex-col justify-center items-center py-8'>
              <div className="w-3/4 h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={globalChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" />
                    <Line type="monotone" dataKey="deaths" stroke="#ff7300" />
                    <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="w-3/4 h-64 ">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {countryData.map((country: any, index: number) => {
                    const position: LatLngExpression = [country.countryInfo.lat, country.countryInfo.long];
                    return (
                      <Marker key={index} position={position}>
                        <Popup>
                          <div>
                            <h3>{country.country}</h3>
                            <p><strong>Active Cases:</strong> {country.active}</p>
                            <p><strong>Recovered Cases:</strong> {country.recovered}</p>
                            <p><strong>Deaths:</strong> {country.deaths}</p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                })}
                </MapContainer>
              </div>
            </div>
      </SideNav>
    </div>
  );
};

export default MapPage;
