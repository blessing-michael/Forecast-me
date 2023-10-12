import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAdminAreas, searchAreas } from '../redux/weather/weatherSlice';
import Location from './Location';
import nigeria from '../images/nigeria.png';
import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { adminAreas, filteredAreas } = useSelector((store) => store.weather);

  useEffect(() => {
    if (adminAreas.length === 0) {
      dispatch(fetchAdminAreas());
    }
  }, [adminAreas.length, dispatch]);

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    dispatch(searchAreas(inputValue));
  };

  return (
    <section className={styles.main}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <img
            src={nigeria}
            alt="nigeria map"
            className={styles.nigeria_map}
          />
          <h1>forecast me</h1>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Location"
          value={search}
          onChange={(e) => handleChange(e)}
        />
      </header>
      <section className={styles.location_container}>
        {
        (filteredAreas.length > 0 ? filteredAreas : adminAreas).map((item) => (
          <Location
            key={item}
            name={item}
          />
        ))
      }
      </section>
    </section>
  );
};

export default Home;
