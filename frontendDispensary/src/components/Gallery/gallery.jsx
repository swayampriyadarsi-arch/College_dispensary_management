import React, { useState, useEffect } from 'react'
import './gallery.css'
import axios from 'axios'

const Gallery = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      props.showLoader();
      await axios.get('/api/gallery/get').then((response) => {
        setData(response.data.images)
      }).catch(err => {
        console.log(err)
       }).finally(()=>{
        props.hideLoader()
      })

    }

    fetchData()
  }, [])
  return (
    <div className='gallary-home'>

      {
        data.map((item, index) => {
          return (
            <div key={index} className='gallary-home-image-block' >
              <img src={item.link} className='gallary-home-image' />
            </div>
          )
        })
      }


    </div >
  )
}

export default Gallery
