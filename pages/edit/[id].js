import  { useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Add.module.css'

const Edit = ({user}) => {
  const [form, setForm] = useState({
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: user.Email,
    Phone: user.Phone,
    Address: user.Address,
  })
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleEdit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:3000/api/user/${router.query.id}`, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      router.push("/")
    }catch (error) {
      alert("error")
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Edit Person</h1>
      <form onSubmit={handleEdit}>
        <input type='text' placeholder='First Name' name='FirstName' value={form.FirstName} onChange={handleChange} required></input>
        <input type='text' placeholder='Last Name' name='LastName' value={form.LastName} onChange={handleChange} required></input>
        <input type='email' placeholder='Email' name='Email' value={form.Email} onChange={handleChange} required></input>
        <input type='number' placeholder='Phone' name='Phone' value={form.Phone} onChange={handleChange} required></input>
        <textarea placeholder='Address' name='Address' value={form.Address} onChange={handleChange} required></textarea>
        <button>Edit</button>
      </form>
    </div>
  );
}

Edit.getInitialProps = async ({query: {id}}) => {
  const res = await fetch(`http://localhost:3000/api/user/${id}`);
  const { data } = await res.json();

  return { user: data }
}

export default Edit;