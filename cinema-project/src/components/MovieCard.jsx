import React from 'react';
import { Button, Card } from 'antd';
import Link from 'antd/es/typography/Link';
import noImage from '../img/glitch-error-404-page-background_23-2148072534.avif';
const { Meta } = Card;

export default function MovieCard({ movie }) {

  const { id, poster_path, title, vote_average, overview } = movie;

  return (

    <Card
      hoverable
      className='card'
      cover={<img style={{ padding: 1, height: 390 }} alt={title} src={poster_path === null ? noImage : `https://image.tmdb.org/t/p/w200${poster_path}`} />}
    >
      <Meta
        title={title}
        description={
          <>
            <span className='rating'>{vote_average !== undefined ? vote_average.toFixed(1) : 0}</span>
            
            <br />
            
            <div className='card-description'>
              {overview}
            </div>

            <Link href={`/movie_page/${id}`}>
              <Button className='movie-card-button' type="primary">Movie Details</Button>
            </Link>
          </>
        }
      />
    </Card>
  );
}
