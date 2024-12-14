import React from 'react'

function Alert({visible,setVisible,message}) {
  return (
    <div className='modal-background' onClick={()=>{
        setVisible(!visible);
    }} style={{ display: visible? "flex":"none"}}>
      <div className='modal-container'>
            <p>{message}</p>
      </div>
    </div>
  )
}

export default Alert
