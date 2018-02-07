import React from 'react';
import { Link } from 'react-router-dom';
import styles from './page.css';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <ul className={styles.nav__ul}>
        <li className={styles.nav__item}>
          <Link to="/" className={styles.nav__link}>Home</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/today" className={styles.nav__link}>Today</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/tomorrow" className={styles.nav__link}>Tomorrow</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/week" className={styles.nav__link}>Week</Link>
        </li>
      </ul>
    </nav>
    <input type="search" name="search" placeholder="Find city..." className={styles.header__search}/>
  </header>
)

export default Header;
