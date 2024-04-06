import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import NewsItem from './NewsItem';
import styles from '../../static/css/news.module.css';
import Modal from '../modals/Modal';
import { fetchNews } from '../../http/deviceApi';
import TypeDropdown from '../listOfObjects/TypeDropdown';
import ModalForItems from '../../modalForTypes/modalForItems';

const NewsList = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { news, user } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalTypeOpen, setIsModalTypeOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    
  };
  const handleOpenModalType = () => {
    
    setIsModalTypeOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalTypeOpen(false);
  };

  console.log(news.selectedType.id);

  return (
    <div className={styles.MainBlock}>
     {user.isAuth ? 
<div className={styles.Drops}>


  <div className={styles.DropModel}>
    <a className={styles.ahref} onClick={handleOpenModal}>
      создать новость
    </a>
  </div>
  <a className={styles.ahref} onClick={handleOpenModalType}>Выберите тип</a>
</div>
: <div className={styles.DropOneItem}>

<a className={styles.ahref} onClick={handleOpenModalType}>Выберите тип</a>
</div>
}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalForItems isOpen={isModalTypeOpen} onClose={handleCloseModal} />
      {news.news.map((newsItem) => (
        <NewsItem key={newsItem.id} news={newsItem} />
      ))}
    </div>
  );
});



export default NewsList;
