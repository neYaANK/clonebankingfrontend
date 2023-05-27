import React, {useState} from 'react';
import axios from 'axios';
import styles from './UploadIcon.module.css';
import AuthService from '../services/auth.service';

// завантаження фото на сервер - у процесі розробки

const UploadIcon = () => {

  const [selectedFile, setSelectedFile] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
        const id = AuthService.getCurrentUser().id;
        const token = AuthService.getCurrentUser().token;
        axios
        .post("http://localhost:8080/users/" + id + "/image",
        {
            image: formData
        },
        {
            headers: { 
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "multipart/form-data" 
            }
        }
      )
      .then((response)=> console.log("response status on uploadIcon(): " + response.status))
      .catch((error) => console.log(error));
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])

    console.log(event.target.files);
  }

  return (
    <form className={styles.block} onSubmit={handleSubmit}>
      <input type="file" name='file' onChange={handleFileSelect}/>
      <input type="submit" value="Завантажити фото" />
    </form>
  )
};

export default UploadIcon;