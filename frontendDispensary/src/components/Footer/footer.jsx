import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {

    const todayDate = new Date()
    return (
        <div className='footer'>
            <div className='foooter-left'>
                <img className='footer-logo' src='https://tse1.mm.bing.net/th/id/OIP.QDUzIo5sZV9sgVYSgbtAJAAAAA?pid=Api&h=220&P=0' />
                <div className='footer-text-white'>Veer Surendra Sai University of Technology</div>
                <div className='footer-text-white'>BURLA</div>
                <div className='footer-text-smaller'>BURLA,ODISHA</div>
                <div className='footer-text-smaller'><PhoneIcon /> 1346-257400</div>
                <div className='footer-text-smaller'><LanguageIcon /> www.vssut.ac.in</div>
            </div>

            <div className='foooter-center'>
                <div className='important-link'>Important Links</div>
                <a href='https://vssut.ac.in/pages/anti-ragging' target='_blank'>Anti-Ragging Initiative</a>
                <a href='https://vssut.ac.in/pages/career-counselling-and-placement' target='_blank'>Career Counselling and Placement Section</a>
                <a href='https://vssut.ac.in/pages/right-to-information' target='_blank'>Right To Information</a>
                <a href='https://vssut.ac.in/pages/special-cell' target='_blank'>Special Cell</a>
                <a href='https://vssut.ac.in/pages/grievance-cell' target='_blank'>Grievance Cell</a>
                <a href='https://vssut.ac.in/pages/contact-us' target='_blank'>Contact Us</a>
                <a href='https://vssut.ac.in' target='_blank'>College Official Website</a>

            </div>

            <div className='footer-right'>
                <div className='footer-right-name'><CloudIcon/>VSSUT BURLA</div>
                <div className='today-date-footer'>{todayDate.toDateString()}</div>
            </div>
        </div>
  )
}

export default Footer
