import React from 'react';
import { Button, Card } from 'antd';
import Link from 'antd/es/typography/Link';
const { Meta } = Card;

export default function MovieCard({ movie }) {
  const { id, poster_path, title, vote_average, overview } = movie;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />}
    >
      <Meta
        title={title}
        description={
          <>
            <span className='rating'>{vote_average.toFixed(1)}</span>
            <br />
            <div style={{ maxHeight: '100px', overflow: 'auto', textOverflow: 'ellipsis' }}>
              {overview}
            </div>      
            <Link href={`/movie_page/${id}`}>
              <Button style={{width: '100%', marginTop: '10px'}} type="primary">Movie Details</Button>
            </Link>
            </>
        }
      />
    </Card>
  );
}
