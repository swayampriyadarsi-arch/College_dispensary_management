import React from 'react'
import './searchBox.css'
import SearchIcon from '@mui/icons-material/Search';
const SearchBox = (props) => {
    const placeholder = props.placeholder?props.placeholder:"";
    const value = props.value ? props.value : "";

  const handleOnChange = (event) => {
    {
      // Please watch the Video for full code
      if(props.onChange){
        props.onChange(event.target.value)
      }
    }
  }

  const handleClick = () => {
    if(props.handleClick){
      props.handleClick()
    }
  }
  return (
    <div className='page-searchBox'>
      <input className='input-box' type="text" value={value} onChange={(event) => handleOnChange(event)} placeholder={placeholder} />
      <button className='search-btn' onClick={handleClick}><SearchIcon /></button>
    </div>
  )
}

export default SearchBox
