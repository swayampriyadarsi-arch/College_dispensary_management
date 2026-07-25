import React,{useState} from 'react'
import './addModal.css'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const AddModal = (props) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const uploadImage = async(e) => {
    const files = e.target.files;
    const data=new FormData();
    data.append('file', files[0]);

    data.append("upload_preset", "college_dispensary");
    setLoader(true)
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dxcnxlvqw/image/upload",data);
      const imageUrl = response.data.url;
      setImage(imageUrl)

    } catch (err) {
      console.log(err)
    } 
    finally {
      setLoader(false)
    }

  }
  const handleSubmit = async () => {
    await axios.post('/api/gallery/add', { link: image }, { withCredentials: true }).then(resp => {
      window.location.reload();
    }).catch(err => {
      console.log(err)
    })
  }

  
  return (
    <div className='addModal'>
      <div className='addModal-card'>
        <div>Add Image</div>
        <div className='modal-add-btns'>
          <div className='cancel-modal-btn' onClick={() => props.onClose()}>
            Cancel
          </div>

          <label htmlFor="fileInput" className='cancel-modal-btn'>Upload</label>
          <input type="file" id="fileInput" className='cancel-file' accept='image/*' onChange={uploadImage}  />
        </div>
         {
          loader && <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
         } 

         {
          image && 
            <img src={image} alt="Uploaded"  style={{width:"300px", height:"300px",marginTop:'20px'}}/>
          
         }

         {
          image && <div className='cancel-modal-btn' onClick={handleSubmit}>
           Submit
          </div>
         }
      </div>
     
    </div>
  )
}

export default AddModal

// preset-name = college_dispensary
// cloudname = dxcnxlvqw
