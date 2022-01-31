import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>
            <img src="/data.png" className={styles.dataIcon} />
          </Link>
        </li>
        <li>
          <Link href='/add_person'><img src="/add.png" className={styles.addIcon} /></Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;