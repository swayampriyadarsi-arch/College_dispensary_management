import React, { useEffect, useState } from 'react'
import './nearByHospital.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../../../components/Modal/modal';
import NearByModal from './NearByModal/nearByModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const NearByHospital = (props) => {
    const [modal, setModal] = React.useState(false);
    const [data, setData] = useState([]);
    const [clickedItem, setClickedItem] = useState(null)
    const onOFModal = () => {
        if (modal) {
            setClickedItem(null)
        }
        setModal(prev => !prev)
    }

    const fetchData = async () => {
        props.showLoader();
        await axios.get('/api/hospital/get').then(response => {
            setData(response.data.hospitals);


        }).catch(err => {
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader()
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = (item) => {
        setClickedItem(item);
        setModal(true)
    }

    const filterOutData = (id) => {
        let newArrr = data.filter((item) => item._id !== id);
        setData(newArrr)
    }

    const handleDelete = async (id) => {
        props.showLoader();
        await axios.delete(`/api/hospital/delete/${id}`,{withCredentials:true}).then((response)=>{
            filterOutData(id);
         }).catch(err => {
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader()
        })
        
    }
    return (
        <div>
            <div className='admin-facility'>
                <div className='go-back'>
                    <Link to="/admin/dashboard">
                        <ArrowBackIcon style={{ cursor: 'pointer' }} />
                        Back to Dashboard
                    </Link>
                </div>

                <div className='admin-facility-header'>
                    <div>Near By Hospitals</div>
                    <div className='add-facility-btn' onClick={onOFModal} >
                        Add
                    </div>
                </div>

                <div className='admin-facility-rows'>

                    {
                        data.map((item, index) => {
                            return (
                                <div className='admin-facility-row' key={item._id}>
                                    <div className='admin-facility-left'>
                                        <div className='admin-facility-title'>{item.name}</div>
                                        <div>Address:{item.address}</div>
                                        <div>Contact No:{item.contact}</div>
                                        <div style={{ marginTop: "10px" }}>Added By :{item?.addedBy?.name}</div>

                                    </div>

                                    <div className='admin-facility-btns'>
                                        <div onClick={()=>(handleEdit(item))}>
                                            <EditIcon />
                                        </div>
                                        <div onClick={()=>(handleDelete(item._id))}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }






                </div>
                {
                    modal && <Modal header="Add Near By Hospital" handleClose={onOFModal} children={<NearByModal clickedItem={clickedItem} />} />}


            </div>
            <ToastContainer />
        </div>
    )
}

export default NearByHospital
