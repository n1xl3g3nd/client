import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../modals/static/css/ModalNewsStatic.module.css';
import { createNews, fetchNews } from '../../http/deviceApi';
import { Context } from '../..';

function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);
 
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const { user, news } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTypeInModal, setSelectedTypeInModal] = useState(null);
  const [selectedTypeNameInModal, setSelectedTypeNameInModal] = useState(null);
  const [selectedTypeIdInModal, setSelectedTypeIdInModal] = useState(null);
  console.log(selectedTypeIdInModal)
  console.log(selectedTypeNameInModal)
  console.log(selectedTypeInModal)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const addDevice = async () => {
    if(selectedTypeIdInModal!==null){
      const formData = new FormData();
    formData.append('text', text);
    formData.append('userId', user.user.id);
    formData.append('image', image);
    formData.append('typeId', selectedTypeIdInModal);
    await createNews(formData);
    }else{
      const formData = new FormData();
    formData.append('text', text);
    formData.append('userId', user.user.id);
    formData.append('image', image);
    await createNews(formData);
    }
    

    try {
      
      fetchNews(news.selectedType.id,news.page,3).then((data) => {
        news.setNews(data.rows);
        news.setTotalCount(data.count);

      });

      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (value) => {
    setSelectedTypeInModal(value);
    setSelectedTypeNameInModal(value.name);
    setSelectedTypeIdInModal(value.id);
    setIsDropdownOpen(false);
  };
  const handleSelectChangeOtmena = () => {
    setIsDropdownOpen(false);
    setSelectedTypeInModal(null);
    setSelectedTypeIdInModal(null);
    setSelectedTypeNameInModal(null);
    
  };
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className="modal-overlay" />
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <textarea
          className={styles.inputInModal}
          type="text"
          placeholder="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.formDiv}>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className={styles.select_container}>
          <div className={styles.select} onClick={toggleDropdown}>
            {selectedTypeInModal ? selectedTypeNameInModal: 'Выберите тип'}
          </div>
          {isDropdownOpen && (
            <div className={styles.select_options}>
               <div
            className={styles.select_option}
            onClick={() => handleSelectChangeOtmena(null)}
          >
            все типы
          </div>
              {news.types.map((type) => (
                <div
                  key={type.id}
                  className={`${styles.select_option} ${news.selectedItem === type && styles.selected}`}
                  onClick={() => handleSelectChange(type)}
                >
                  {type.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className={styles.btn} onClick={addDevice}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Modal;
