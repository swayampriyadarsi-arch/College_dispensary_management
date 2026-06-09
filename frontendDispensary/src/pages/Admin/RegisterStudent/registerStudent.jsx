import React, { useState } from 'react'
import './registerStudent.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import SearchBox from '../../../components/SearchBox/searchBox';
import Modal from '../../../components/Modal/modal';
import Report from './Report/report';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
const RegisterStudent = (props) => {
    const [searchStudent, setSearchStudent] = useState("");
    const [reportModal, setReportModal] = useState(false)

    const [studentDetail, setStudentDetail] = useState({ _id: "", email: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" });

    const handleOnChangeInputField = (event, key) => {
        setStudentDetail({ ...studentDetail, [key]: event.target.value })
    }

    const openCloseModal = () => {
        setReportModal(prev => !prev)
    }

    const handleOnChange = (value) => {
        setSearchStudent(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleSearch = async () => {
        if (searchStudent.trim().length === 0) return toast.error("Please enter correct roll number.");

        props.showLoader();
        await axios.get(`http://localhost:4000/api/auth/get-student-by-roll/${searchStudent}`, { withCredentials: true }).then(response => {
            console.log(response)
            // toast.success(response.data.message);
            setStudentDetail({ ...studentDetail, ...response.data.student })


        }).catch(err => {
            setStudentDetail({ _id: "", email: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" });
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader()
        })
    }

    const handleUpdateFunc = async () => {
        if (studentDetail.name.trim().length === 0 || studentDetail.email.trim().length === 0 || studentDetail.roll.trim().length === 0 || studentDetail.mobileNo.trim().length === 0) return toast.error("Name, Mobile No and Roll cant be empty");
        props.showLoader();
        const { _id, updatedAt, ...student } = { ...studentDetail };
         await axios.put(`http://localhost:4000/api/auth/update-student/${_id}`,student, { withCredentials: true }).then(response => {
            console.log(response)
            toast.success(response.data.message);
           

        }).catch(err => {
            console.log(err)
            setStudentDetail({ _id: "", email: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" });
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader()
        })

    }

    const registerStudent = async () => {
        if (studentDetail.name.trim().length === 0 || studentDetail.email.trim().length === 0 || studentDetail.roll.trim().length === 0 || studentDetail.mobileNo.trim().length === 0) return toast.error("Name, Mobile No, Email and Roll cant be empty");
        props.showLoader();
         await axios.post('http://localhost:4000/api/auth/registerStudentByStaff',studentDetail, { withCredentials: true }).then(response => {
            console.log(response)
            toast.success(response.data.message);
           

        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader()
        })
    }

    return (
        <div className='register-student'>
            <div className='go-back'>
                <Link to="/admin/dashboard">
                    <ArrowBackIcon style={{ cursor: 'pointer' }} />
                    Back to Dashboard
                </Link>
            </div>
            <SearchBox handleClick={handleSearch} placeholder={"Search By Rollno"} value={searchStudent} onChange={handleOnChange} />
            <div className='register-form-block'>
                <div className='register-form-header'>Register Student</div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-form-div'>
                        <div className='register-input-box'>
                            <input value={studentDetail.name} onChange={(e) => handleOnChangeInputField(e, "name")} className='input-box-register' type="text" placeholder="Student Name" />
                        </div>
                        <div className='register-input-box'>
                            <input disabled={studentDetail?._id}value={studentDetail.email} onChange={(e) => handleOnChangeInputField(e, "email")} className='input-box-register' type="email" placeholder="Email" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.roll} onChange={(e) => handleOnChangeInputField(e, "roll")} className='input-box-register' type="text" placeholder="Roll No" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.mobileNo} onChange={(e) => handleOnChangeInputField(e, "mobileNo")} className='input-box-register' type="text" placeholder="Mobile No" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherName} onChange={(e) => handleOnChangeInputField(e, "fatherName")} className='input-box-register' type="text" placeholder="Fathers Name" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherMobile} onChange={(e) => handleOnChangeInputField(e, "fatherMobile")} className='input-box-register' type="text" placeholder="Fathers Mobile No" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.address} onChange={(e) => handleOnChangeInputField(e, "address")} className='input-box-register' type="text" placeholder="Address" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.previous_health} onChange={(e) => handleOnChangeInputField(e, "previous_health")} className='input-box-register' type="text" placeholder="Previous Health Issues" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.age} onChange={(e) => handleOnChangeInputField(e, "age")} className='input-box-register' type="number" placeholder="Age" />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.bloodGroup} onChange={(e) => handleOnChangeInputField(e, "bloodGroup")} className='input-box-register' type="text" placeholder="Blood Group" />
                        </div>

                    </div>
                    {
                        studentDetail?._id ?
                    (<div className='block-divs'>
                        <button type='submit' onClick={handleUpdateFunc} className='form-btn reg-btn'>Update</button>
                        <button type='submit' onClick={openCloseModal} className='form-btn reg-btn'>Report</button>
                    </div>):( <button type='submit' onClick={registerStudent} className='form-btn reg-btn'>Register</button>)
                    }



                </form>
            </div>
            {reportModal && <Modal header="Report" handleClose={openCloseModal} children={<Report studentDetail={studentDetail}/>} />}
            <ToastContainer />
        </div>
    )
}

export default RegisterStudent
