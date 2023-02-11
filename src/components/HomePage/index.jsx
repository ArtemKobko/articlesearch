import React, { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import dayjs from 'dayjs';
import { fetchArticles } from '../../models/articles/articleSlice';
import { selectArticles } from '../../models/articles/selectors';
import Card from '../Card';
import styles from './HomePage.module.scss';

function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const [value, setValue] = useState('');
  const pattern = new RegExp(`\\b${value}`, 'gi');

  useEffect(() => { dispatch(fetchArticles()); }, []);

  const highlight = (text) => <Highlighter searchWords={[pattern]} textToHighlight={text} />;

  const getSortedArticles = (data) => {
    const sortedData = [[], [], [], []];

    data.forEach((article) => {
      const { title } = article;
      const summary = article.summary.length > 120
        ? article.summary.slice(0, 120)
        : article.summary;

      if (title.search(pattern) > -1 && summary.search(pattern) > -1) {
        sortedData[0].push(article);
      } else if (title.search(pattern) > -1) {
        sortedData[1].push(article);
      } else if (summary.search(pattern) > -1) {
        sortedData[2].push(article);
      }
    });

    return sortedData.flat(1);
  };

  const sortedArticles = getSortedArticles(articles);

  const itemsWithHighlightedText = sortedArticles.map((article) => {
    const summary = article.summary.length > 120
      ? `${article.summary.slice(0, 120)}...`
      : article.summary;

    const props = {
      ...article,
      title: highlight(article.title),
      summary: highlight(summary),
      publishedAt: dayjs(article.publishedAt).format('DD MMM YYYY, hh:mm'),
    };

    return <Card key={article.id} {...props} />;
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
            <>
              Search by keyword
              {' '}
              <SearchOutlinedIcon fontSize="small" />
            </>
          )}
          id="fullWidth"
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </Box>
      <div className={styles.cardConteiner}>{itemsWithHighlightedText}</div>
    </div>
  );
}

export default HomePage;
