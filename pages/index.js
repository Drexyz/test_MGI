import {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../styles/Main.module.css'


export default function Home({photos}) {
  const [photosData, setPhotosData] = useState(photos);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexPage, setIndexPage] = useState([1]);
  const [dataPage, setDataPage] = useState([])
  const postsPerPage = 12;

  const getTotalPage = () => {
    //get total page needed
    const total = Math.ceil(photosData.length/postsPerPage)
    //setTotalPage(total)

    //make array of index page
    var countTotal = []
    for (let i=1;  i <= total; i++) {
      countTotal.push(i);
    }

    setIndexPage(countTotal);
  }

  const getDataPage = () => {
    const data = photosData.map(photo => {return photo})
    const dataArr = []
    //get data to display in a page
    while (data.length > 0)
      dataArr.push(data.splice(0, postsPerPage));

    console.log(dataArr)
    setDataPage(dataArr);
  }

  useEffect(() => {
    getTotalPage()
    getDataPage()
    console.log(dataPage)
  }, [photosData])

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {dataPage[currentPage-1]?.map(photo => {return (
          <div className={styles.card}>
            <Link href={`/${photo.id}`}>
              <img src={photo.thumbnailUrl} className={styles.img}/>
            </Link>
            <Link href={`/${photo.id}`}>
              <p>{photo.title.length <= 15 ? (photo.title) : (photo.title.slice(0, 12) + '...') }</p>
            </Link>
          </div>  
        )})}
      </div>
      <div className={styles.pageNavigators}>
        {indexPage.map(el => {
          return (
            el === currentPage ? (
              <button onClick={() => setCurrentPage(el)} className={styles.pageActive} key={el}>{el}</button>
            ) : (
              <button onClick={() => setCurrentPage(el)} className={styles.pageNavigator} key={el}>{el}</button>
            ) 
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
  const photos = await res.json()

  return { props: { photos } }
}
