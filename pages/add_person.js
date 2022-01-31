import  { useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Add.module.css'

const add_person = () => {
  const [form, setForm] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Address: '',
  })
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
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
      <h1>Add New Person</h1>
      <form onSubmit={handleAdd}>
        <input type='text' placeholder='First Name' name='FirstName' onChange={handleChange} required></input>
        <input type='text' placeholder='Last Name' name='LastName' onChange={handleChange} required></input>
        <input type='email' placeholder='Email' name='Email' onChange={handleChange} required></input>
        <input type='number' placeholder='Phone' name='Phone' onChange={handleChange} required></input>
        <textarea placeholder='Address' name='Address' onChange={handleChange} required></textarea>
        <button>Add</button>
      </form>
    </div>
  );
}

export default add_person;