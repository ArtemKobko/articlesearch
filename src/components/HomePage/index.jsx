/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { fetchArticles } from '../../models/articles/articleSlice';
import { selectArticles } from '../../models/articles/selectors';
import Card from '../Card';
import styles from './HomePage.module.scss';

function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const [value, setValue] = useState('');

  useEffect(() => { dispatch(fetchArticles()); }, []);

  const getWords = (text) => text.toLowerCase().split(' ');

  const highlight = (array) => array.map((word, index) => {
    if ((word.toLowerCase().startsWith(value.toLowerCase()) || word.toUpperCase().startsWith(value.toUpperCase())) && value) {
      return (
        <Highlighter
          key={index}
          searchWords={[value]}
          textToHighlight={word}
        />
      );
    }
    return ` ${word} `;
  });

  // const sortFunction = (a, b) => {
  //   if ((a.title.includes(value) && a.summary.includes(value)) && (!b.title.includes(value) && !b.summary.includes(value))) {
  //     console.log(1);
  //     return 1;
  //   }
  //   if ((a.title.includes(value) && a.summary.includes(value)) && (!b.title.includes(value) && b.summary.includes(value))) {
  //     console.log(2);

  //     return -1;
  //   }
  //   if ((a.title.includes(value) && a.summary.includes(value)) && (b.title.includes(value) && !b.summary.includes(value))) {
  //     console.log(3);

  //     return 0;
  //   }
  //   if ((!a.title.includes(value) && !a.summary.includes(value)) && (b.title.includes(value) && b.summary.includes(value))) {
  //     console.log(4);

  //     return 1;
  //   }
  //   if ((!a.title.includes(value) && a.summary.includes(value)) && (b.title.includes(value) && b.summary.includes(value))) {
  //     console.log(5);

  //     return 1;
  //   }
  //   if ((a.title.includes(value) && !a.summary.includes(value)) && (b.title.includes(value) && b.summary.includes(value))) {
  //     console.log(6);

  //     return -1;
  //   }
  //   if ((a.title.includes(value) && a.summary.includes(value)) && (b.title.includes(value) && b.summary.includes(value))) {
  //     console.log(7);

  //     return 0;
  //   }
  //   console.log(0);

  //   return 0;
  // };
  const filteredArticles = articles.filter((article) => {
    const { title, summary } = article;
    const words = [...getWords(title), ...getWords(summary.slice(0, [25]))];
    return words.some((word) => word.startsWith(value.toLowerCase().trim()));
  }).map((article) => {
    const titleWords = [...article.title.split(' ')];
    const summaryWords = [...article.summary.split(' ')];
    return {
      ...article,
      title: highlight(titleWords),
      summary: highlight(summaryWords),
      publishedAt: new Date(article.publishedAt),
    };
  });
  return (
    <div className={styles.homePage}>
      <Box
        sx={{
          width: 600,
          height: 50,
          marginLeft: 2,
          maxWidth: '100%',
        }}
      >
        <TextField
          fullWidth
          label={(
            < >
              Search by keyword
              {' '}
              <SearchOutlinedIcon fontSize="small" />
            </>
)}
          id="fullWidth"
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </Box>
      <div className={styles.cardConteiner}>
        {filteredArticles.map((article) => <Card className={styles.card} key={article.id} {...article} />)}
      </div>
    </div>
  );
}

export default HomePage;
