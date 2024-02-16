import React, { useEffect, useState } from 'react'
import { UserList } from './UserList';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import AddData from './Addform';


const UserAddNew = () => {
    const navigate = useNavigate();
    const initArray = {fn: '',ln: '', email:'', number:'', address:''}
    const [formData, setFormData] = useState(initArray);
    const [collection, setCollection] = useState(JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : '');
    const [toggle, setToggle] = useState(false)
    const [edit, setEdit] = useState('');

    function handleChange(event) {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value, id:new Date().getTime().toString()}))
    }

    /* On submit add or edit data  */
    function handleSubmit(e) {
        e.preventDefault();
        
        if(toggle && edit) {
            setCollection(
            collection.map(item => {
                console.log(item, edit);
                if(item.id === edit) {
                    return {...item, fn:formData.fn, ln:formData.ln, email:formData.email, number:formData.number, address:formData.address}
                }
                return item;
            }))
            setToggle(false);
            navigate('/user-lists');
        } else {
            setCollection((allArr) => ([...allArr, formData]))
            navigate('/user-lists');
        }
        setFormData(initArray)
    } 



     function deleteData(e) {
        const getdltelem = collection.filter(dlt => {
            return dlt.id !== e;
        })
        setCollection(getdltelem);
    }

   
    function backtoForm() {
        navigate('/');
    }

    useEffect(()=> {
        localStorage.setItem('userData', JSON.stringify(collection));
    }, [collection])

  return (
    <>
        <Routes>
            <Route path="/" element={<AddData handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} />} />  
            <Route path="/user-lists" element={<UserList collection={collection}   deleteData={deleteData}    backtoForm={backtoForm} />} />
        </Routes>
    </>
  )
}

export default UserAddNew