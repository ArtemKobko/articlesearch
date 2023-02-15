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
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

interface ArticleCardProps {
  imageUrl: string;
  title: React.ReactElement;
  summary: React.ReactElement;
  publishedAt: string;
  id: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  title,
  summary,
  publishedAt,
  id,
}) => {
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
};

export default ArticleCard;
