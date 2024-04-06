import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../modalForTypes/static/ModalNewsStatic.module.css';

import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const ModalForItems = observer(({ isOpen, onClose }) => {
  const modalRef = useRef(null);
 
  const [filterFriends, setFilterFriends] = useState(false);
  const { user, news } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(user.isAuth)
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

 console.log(news)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (value) => {
    news.setSelectedType(value);
    onClose();
  };
  const handleSelectChangeOtmena = () => {
    news.setSelectedType({});
    onClose();
  };
  const handleSelectChangeFriendsNews = () => {
    news.setFriendsInFilter(true)
    onClose();
  };
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className="modal-overlay" />
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
       
        <div className={styles.select_container}>
          <div className={styles.select} onClick={toggleDropdown}>
            {news.selectedType.name? news.selectedType.name: 'Выберите тип'}
          </div>
          {isDropdownOpen && (
            <div className={styles.select_options}>
               <div
            className={styles.select_option}
            onClick={() => handleSelectChangeOtmena(null)}
          >
            все типы
          </div>
          {user.isAuth

          ?<div
            className={styles.select_option}
            onClick={() => handleSelectChangeFriendsNews()}
          >
            Только от друзей
          </div>
          :null
          }
         
          {news.types.map((type) => (
            <div
              key={type.id}
              className={`${styles.select_option} ${
                news.selectedItem === type && styles.selected
              }`}
              onClick={() => handleSelectChange(type)}
            >
              {type.name}
            </div>
          ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
})

export default ModalForItems;
