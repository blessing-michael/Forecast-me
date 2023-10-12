import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Location.module.css';

const Location = ({ name }) => (
  <div className={styles.location}>
    <NavLink to={`/${name}`}>
      <span className={styles.arrow}>→</span>
    </NavLink>
    <p>{name}</p>
  </div>
);

Location.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Location;
