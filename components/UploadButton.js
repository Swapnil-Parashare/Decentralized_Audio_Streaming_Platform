import React from 'react'

const styles = {
  uploadButton: `bg-green-500 mr-10 px-3 py-1.5 cursor-pointer hover:scale-95 transition rounded-full`,

}

const UploadButton = ({setShowUploadMusic}) => {

    const uploadClicked = () => {
        setShowUploadMusic(true);
    }

  return (
    <div>
        <div 
            className = {styles.uploadButton}
            onClick = {uploadClicked}
            >
            Upload Music
        </div>
    </div>
  )
}

export default UploadButton