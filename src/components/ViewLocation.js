import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../styles/ViewLocation.module.css';
import nigeria from '../images/nigeria.png';
import { fetchLocationData } from '../redux/weather/weatherSlice';

const ViewLocation = () => {
  const { name } = useParams();
  const { weather } = useSelector((store) => store.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocationData(name));
  });

  return (
    <section>
      <div className={styles.header}>
        <Link to="/">
          <h1 className={styles.backBtn}> &lt; </h1>
        </Link>
        <div className={styles.nav}>
          <img
            src={nigeria}
            alt="nigeria map"
            className={styles.nigeria_map}
          />
          <h1>forecast me</h1>
        </div>
      </div>
      <div className={styles.weatherBox}>
        <h3>
          Weather in
          {' '}
          { name}
        </h3>
      </div>
      <section className={styles.weatherDetails}>
        <p>{weather.text}</p>
        <p>
          Temperature:
          {' '}
          {weather.minTemp}
          F
          {' '}
          -
          {' '}
          {weather.maxTemp}
          F
        </p>
        <p>{(weather.dayPrecipitation) ? 'Day Time: Expect rain' : 'Day Time: No rain'}</p>
        <p>{(weather.nightPrecipitation) ? 'Night Time: Expect rain' : 'Night Time: No rain'}</p>
      </section>
    </section>
  );
};

export default ViewLocation;
