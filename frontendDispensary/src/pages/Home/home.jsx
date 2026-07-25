import React, { useState } from 'react'
import './home.css'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ImageIcon from '@mui/icons-material/Image';
import AboutUs from '../../components/AboutUs/aboutUs';
import Staff from '../../components/Staffs/staff';
import Facilities from '../../components/Facilities/facility';
import NearByHospital from '../../components/NearByHospitals/nearByHospitals';
import Gallery from '../../components/Gallery/gallery';
import { Link } from 'react-router-dom';
const Home = (props) => {

  const [page, setPage] = useState("About")
  let [rightSideHeader, setRightSideHeader] = useState("About Us");
  let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const handleChangeTab = (pagename) => {
    setPage(pagename);
    switch (pagename) {
      case "About":
        setRightSideHeader("About Us");
        break;
      case "Staff":
        setRightSideHeader("Our Staffs");
        break;
      case "Facilities":
        setRightSideHeader("Facilities");
        break;
      case "NearByHospitals":
        setRightSideHeader("Near By Hosptals");
        break;
      case "Gallery":
        setRightSideHeader("Gallery");
        break;
    }
  }
  const getComponent = () => {
    switch (page) {
      case "About":
        return <AboutUs />;
      case "Staff":
        return <Staff showLoader={props.showLoader} hideLoader={props.hideLoader} />;
      case "Facilities":
        return <Facilities showLoader={props.showLoader} hideLoader={props.hideLoader} />;
      case "NearByHospitals":
        return <NearByHospital showLoader={props.showLoader} hideLoader={props.hideLoader} />;
      case "Gallery":
        return <Gallery showLoader={props.showLoader} hideLoader={props.hideLoader} />;

      default:
        return null;
    }
  }
  return (
    <div className='home'>
      <div className='home-block'>
        <div className='home-left-page'>
          {
            userInfo && userInfo?.role !== 'student' && <Link to={'/admin/dashboard'} className={`home-left-option`} >
              <HomeIcon /> Dashboard
            </Link>
          }
          {
            userInfo && userInfo?.role === 'student' && <Link to={`/student/${userInfo?._id}`} className={`home-left-option`} >
              <HomeIcon /> Profile
            </Link>
          }
          <div className={'home-left-option ' + (page === "About" ? "active-opt" : "")} onClick={() => { handleChangeTab("About") }}>
            <HomeIcon />AboutUs
          </div>
          <div className={'home-left-option' + (page === "Staff" ? " active-opt" : "")} onClick={() => { handleChangeTab("Staff") }}>
            <PeopleIcon />Staff
          </div>
          <div className={'home-left-option' + (page === "Facilities" ? " active-opt" : "")} onClick={() => { handleChangeTab("Facilities") }}>
            <Diversity3Icon />Facilities
          </div>
          <div className={'home-left-option' + (page === "NearByHospitals" ? " active-opt" : "")} onClick={() => { handleChangeTab("NearByHospitals") }}>
            <LocalHospitalIcon />Near By Hospitals
          </div>
          <div className={'home-left-option' + (page === "Gallery" ? " active-opt" : "")} onClick={() => { handleChangeTab("Gallery") }}>
            <ImageIcon />Gallery
          </div>

        </div>
        <div className='home-right-page'>
          <div className='home-right-header'>
            {rightSideHeader}
          </div>
          <div className='home-right-section'>
            {getComponent()}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home
