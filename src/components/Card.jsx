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

export default function MultiActionAreaCard({
  imageUrl,
  title,
  summary,
  publishedAt,
  id,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 450,
        width: '30%',
        height: 530,
        margin: 2,
        position: 'relative',
      }}
    >
      <CardMedia component="img" height="200" image={imageUrl} alt="" />
      <CardContent sx={{ cursor: 'default' }}>
        <Typography component="div" color="text.disabled">
          {publishedAt}
        </Typography>
        <Typography sx={{ fontSize: 24, margin: '12px 0' }} component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ position: 'absolute', top: '480px' }}
          onClick={() => {
            navigate(`${id}`);
          }}
        >
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  summary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  publishedAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
