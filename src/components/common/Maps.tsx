import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, getWorldWideData } from 'redux/slices/countrySlice';
import { UseFetcher } from 'api-services/axios-common';
import LineGraph from '../screens/LineGraph';
import { useSpring, animated } from 'react-spring';

interface CountryData {
  active: number;
  cases: number;
  continent: string;
  country: string;
  deaths: number;
  recovered: number;
  todayCases: number;
  todayDeaths: number;
}
const Loader = () => (
  <div className="flex items-center justify-center h-full mt-14">
    <div className="loader--style1 mt-14" id="Main-Loader">
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 40 40"
        enableBackground="new 0 0 40 40"
        xmlSpace="preserve"
      >
        <path
          opacity="0.2"
          fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        />
        <path
          fill="#000"
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  </div>
);
const Maps: React.FC<{ countries: CountryData[] }> = ({ countries }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <MapContainer center={[0, 0]} zoom={3} style={{ height: '65vh', width: '95%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {countries.map((country: any, index: any): any => (
          <Marker key={index} position={[country.countryInfo.lat, country.countryInfo.long]}>
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const MapComponent: React.FC = () => {
  const countriesData = useSelector((state: any) => state.country.countries);
  const worldWideData = useSelector((state: any) => state.country.world);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  console.log('worldWideData', worldWideData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UseFetcher('get', '/countries', {});
        const response2 = await UseFetcher('get', '/all', {});
        dispatch(getAllCountries(response));
        dispatch(getWorldWideData(response2));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  function Numbers({ n }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 100, friction: 10 },
    });
    // eslint-disable-next-line react/prop-types
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  }
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center align-middle">
          <h1 className="text-3xl">Global Situation</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="flex justify-center align-middle text-2xl">Total Cases :</div>
          <div className="flex justify-center text-4xl rounded-none p-4 glass-box border-black">
            {<Numbers n={worldWideData?.cases} />}
          </div>
          <div className="flex justify-center align-middle text-2xl">Active Cases :</div>
          <div className="flex justify-center text-4xl rounded-none p-4 glass-box border-black ">
            {<Numbers n={worldWideData?.active} />}
          </div>
          <div className="flex justify-center align-middle text-2xl">Recovered :</div>
          <div className="flex justify-center text-4xl rounded-none p-4 glass-box border-black ">
            {<Numbers n={worldWideData?.recovered} />}
          </div>
          <div className="flex justify-center align-middle text-2xl">Death :</div>
          <div className="flex justify-center text-4xl rounded-none p-4 glass-box border-black ">
            {<Numbers n={worldWideData?.deaths} />}
          </div>
        </div>
      </div>
      {loading ? <Loader /> : <Maps countries={countriesData} />}

      <LineGraph />
    </div>
  );
};

export default MapComponent;
