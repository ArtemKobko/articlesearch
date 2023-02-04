/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import PropTypes from 'prop-types';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import monthNames from '../constants';

export default function MultiActionAreaCard(props) {
  const navigate = useNavigate();
  const {
    imageUrl, title, summary, publishedAt, id,
  } = props;
  return (
    <Card sx={{
      maxWidth: 450,
      width: 400,
      height: 530,
      margin: 2,
      position: 'relative',
    }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt=""
      />
      <CardContent sx={{ cursor: 'default' }}>
        <Typography component="div" color="text.disabled">
          {`${publishedAt.getDate()} ${monthNames[publishedAt.getMonth()]} ${publishedAt.getFullYear()},
             ${publishedAt.getHours()}:${publishedAt.getMinutes() < 10 ? '0' : ''}${publishedAt.getMinutes()}`}
        </Typography>
        <Typography sx={{ fontSize: 24, margin: '15px 0' }} component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          {summary.slice(0, [25])}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ position: 'absolute', top: '480px' }} onClick={() => { navigate(`${id}`); }}>
          Read more
          {' '}
          <ChevronRightOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
MultiActionAreaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.arrayOf(PropTypes.shape || PropTypes.node),
  summary: PropTypes.arrayOf(PropTypes.shape || PropTypes.node),
  publishedAt: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
};
