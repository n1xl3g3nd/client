import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../..';
import styles from '../../static/css/pagination.module.css';

const Pages = observer(() => {
  const { news } = useContext(Context);
  const PageCount = Math.ceil(news.totalCount  / news.limit);
const pages = Array.from({ length: PageCount }, (_, index) => index + 1);
  
  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={news.page === page ? styles.active : ''}
          onClick={() => news.setPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
});

export default Pages;