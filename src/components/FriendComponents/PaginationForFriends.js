import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../..';
import styles from '../../static/css/pagination.module.css';

const PaginationForFriends = observer(() => {
  const { users  } = useContext(Context);
  const PageCount = Math.ceil(users.totalCount / users.limit);
const pages = Array.from({ length: PageCount }, (_, index) => index + 1);
  
  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={users.page === page ? styles.active : ''}
          onClick={() => users.setPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
});

export default PaginationForFriends;