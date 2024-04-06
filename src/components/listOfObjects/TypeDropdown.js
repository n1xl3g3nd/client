import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import styles from '../../static/css/news.module.css';

const TypeDropdown = observer(() => {
  const { news } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allTypesName, setAllTypesName] = useState(null);
  const handleSelectChange = (value) => {
    news.setSelectedType(value);
    setIsDropdownOpen(false);
  };
console.log(allTypesName)
  const handleSelectChangeOtmena = () => {
    setIsDropdownOpen(false);
    setAllTypesName('Все типы')
    news.setSelectedType({});
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={styles.select_container}>
      <div className={styles.select} onClick={toggleDropdown}>
        {news.selectedType.id ? news.selectedType.name  : allTypesName || 'Выберите тип'}
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
  );
});

export default TypeDropdown;