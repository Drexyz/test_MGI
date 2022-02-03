import { useRouter } from 'next/router'
import styles from '../styles/Photo.module.css'

const photo = ({photoData}) => {
  return (
    <div className={styles.container}>
      <h1>{photoData.title}</h1>
      <img src={photoData.url} className={styles.img}/>
    </div>
  );
}

export async function getServerSideProps({query: {id}}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?id=${id}`)
  const response = await res.json()
  const photoData = response[0]

  return { props: { photoData } }
}

export default photo;