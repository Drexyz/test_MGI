import styles from '../styles/Layout.module.css'
import Head from 'next/head'
import Nav from './Nav'

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MGI Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
}

export default Layout;