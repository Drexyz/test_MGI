import Link from 'next/link'
import {useState, useEffect} from 'react'
import styles from '../styles/Table.module.css'


export default function Home({ users }) {
  const [usersData, setUsersData] = useState(users);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexPage, setIndexPage] = useState([1]);
  const [dataPage, setDataPage] = useState([])
  const postsPerPage = 8;

  const getTotalPage = () => {
    //get total page needed
    const total = Math.ceil(usersData.length/postsPerPage)
    setTotalPage(total)

    //make array of index page
    var countTotal = []
    for (let i=1;  i <= total; i++) {
      countTotal.push(i);
    }

    setIndexPage(countTotal);
  }

  const getDataPage = () => {
    const data = usersData.map(user => {return user})
    const dataArr = []
    //get data to display in a page
    while (data.length > 0)
      dataArr.push(data.splice(0, postsPerPage));

    setDataPage(dataArr);
  }

  const handleDelete = async (id) => {
    try {
      const deleted = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE'
      })
      setUsersData(usersData.filter(user => user._id !== id))
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }

  useEffect(() => {
    getTotalPage()
    getDataPage()
  }, [usersData])
  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(currentPage-1)
    }
  }, [totalPage])


  return (
    <div className={styles.container}>
      <h1>Data List</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>  
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPage[currentPage-1]?.map(user => {
              return (
                <tr key={user._id}>
                  <td>{`${user.FirstName} ${user.LastName}`}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone}</td>
                  <td>{user.Address}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/edit/${user._id}`}>
                        <button className={styles.edit}>Edit</button>
                      </Link>
                      <button className={styles.delete} onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const { data } = await res.json();

  return { users: data }
}
