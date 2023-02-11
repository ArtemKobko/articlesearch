import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from '@mui/material';
import dayjs from 'dayjs';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { selectArticles, selectLoading } from '../../models/articles/selectors';
import { fetchArticles } from '../../models/articles/articleSlice';

function ArticlePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const { articleId } = useParams();

  useEffect(() => { dispatch(fetchArticles()); }, []);
  const article = articles.find((e) => e.id === Number(articleId));

  if (!loading && article) {
    const date = dayjs(article.publishedAt).format('DD MMM YYYY, hh:mm');
    return (
      <Card sx={{
        maxWidth: 1100,
        width: '90%',
        height: 'auto',
        margin: '25px auto',
      }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="450px"
            image={article.imageUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography component="div" color="text.disabled">
              {date}
            </Typography>
            <Typography sx={{ fontSize: 24, marginTop: '5px' }} component="div">
              {article.title}
            </Typography>
            <Typography sx={{ fontSize: 16, marginTop: '10px' }} color="text.secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed minima quia, quas perspiciatis illo iusto temporibus totam quo velit ut quasi! Nulla optio magni dignissimos ratione ea ipsa itaque suscipit, quia quidem alias deserunt expedita. Fugit quod officia fugiat quis in debitis laudantium possimus. Ipsam voluptatem corporis aliquid esse. Deserunt, veritatis est eveniet animi non voluptate omnis repellat obcaecati. Architecto voluptate omnis modi quam reiciendis, sit dolorum repellendus beatae repudiandae! Accusantium, maiores? Eius doloribus necessitatibus labore ea veniam laudantium, adipisci corrupti rerum distinctio sed, quidem harum quod fuga minus deserunt aliquam ipsum. Non cum laboriosam quia culpa consequatur fugit ullam maiores velit, voluptates facere vitae, maxime ipsa hic doloribus, sunt illo sit magni exercitationem dolorem unde quaerat. Ducimus incidunt deserunt eaque enim tempore eius necessitatibus nam aspernatur consequuntur facere eligendi vel suscipit fugiat consectetur ipsam corrupti sit ut rem, inventore officiis quos animi magnam. Distinctio voluptate minima possimus repellendus quia?
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => { navigate('/'); }}>
            <ChevronLeftOutlinedIcon />
            Back to Home Page
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default ArticlePage;
