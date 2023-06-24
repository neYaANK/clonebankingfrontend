// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './UploadIcon.module.css';
// import AuthService from '../services/auth.service';

// // завантаження фото на сервер - у процесі розробки

// const UploadIcon = () => {

//   const [selectedFile, setSelectedFile] = useState(AuthService.getUserImage());

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     AuthService.changeUserImage(formData)
//       .then(() => AuthService.setUserImage())
//       .then(() => setSelectedFile(AuthService.getUserImage()))
//   }

//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0])

//     console.log(event.target.files);
//   }

//   return (
//     <form className={styles.block} onSubmit={handleSubmit}>
//       <input type="file" name='file' onChange={handleFileSelect} />
//       <input type="submit" value="Завантажити фото" />
//     </form>
//   )
// };

// export default UploadIcon;

import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from './UploadIcon.module.css';
import AuthService from '../services/auth.service';
import ModalCreditOpen from '../Credits/ModalCreditOpen';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';
import go_back_arrow_icon from '../images/go_back_arrow_icon.png';
import success_icon from '../images/success_icon.png';

// завантаження фото на сервер - у процесі розробки

const UploadIcon = () => {

  const [selectedFile, setSelectedFile] = useState(AuthService.getUserImage());

  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false)

  const demoMessage = "Функція недоступна у демоверсії";

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", selectedFile);

    AuthService.changeUserImage(formData)
      .then(() => AuthService.setUserImage())
      .then(() => setSelectedFile(AuthService.getUserImage()))
      .then(() => setModalActive(true))
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])

    console.log(event.target.files);
  }

  return (
    <>
      <MainPageHeader />
      <div className={styles.upper__line}>
        <div className={styles.upper__line__combo_}>
          <div>
            <Link onClick={() => navigate(-1)}>
              <img className={styles.upper__line__go__back__img} src={go_back_arrow_icon}></img>
            </Link>
          </div>
        </div>
        <div className={styles.get__consult}>
          <button className={styles.get__consult__button} onClick={() => alert(demoMessage)}>Отримати консультацію</button>
        </div>
      </div>
      <div className={styles.container__photo}>


        <form className={styles.block} onSubmit={handleSubmit}>
          <input className={styles.input__photo} type="file" name='file' onChange={handleFileSelect} />
          <input className={styles.download__button} type="submit" value="Завантажити фото" />
        </form>

      </div>

      <MainPageFooter />

      <ModalCreditOpen active={modalActive} setActive={setModalActive}>
        <div className={styles.modal__credits}>
          <div className={styles.modal__credits__congrats}>
            <img className={styles.modal__credits__img} src={success_icon}></img>
            <div className={styles.modal__credits__text}>Вітаємо!</div>
            <div className={styles.modal__credits__text}>Фото</div>
            <div className={styles.modal__credits__text}>успішно змінено</div>
          </div>
          <div className={styles.modal__credits__buttons}>
            <button className={styles.modal__credits__button__to__main} onClick={() => navigate('/profile')}>У профіль</button>
          </div>
        </div>
      </ModalCreditOpen>

    </>


  )
};

export default UploadIcon;