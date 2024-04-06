import React, { useContext } from 'react'
import { Context } from '..'
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedTypeInModal, setSelectedTypeInModal] = useState(null);
const [selectedTypeNameInModal, setSelectedTypeNameInModal] = useState(null);
const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectChange = (value) => {
    setSelectedTypeInModal(value);
    setSelectedTypeNameInModal(value.name);
    setIsDropdownOpen(false);
  };
  
const typeList = () => {
    const {news} = useContext(Context)
  return (
    <div className={styles.select_container}>
    <div className={styles.select} onClick={toggleDropdown}>
      {selectedTypeInModal ? selectedTypeNameInModal: 'Select an option'}
    </div>
    
    {isDropdownOpen && (
      <div className={styles.select_options}>
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
  )
}

export default typeList
