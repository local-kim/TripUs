import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const ReviewList = ({reviewList}) => {
  const navigate = useNavigate();

  return (
    <div id='review-list'>
      {
        reviewList.length === 0 ? (
          <div style={{textAlign:'center', color: 'gray', marginTop:'100px'}}>작성한 후기가 없습니다.</div>
        ) : ""
      }
      {
        reviewList && reviewList.map((review, index) => (
          <div className='review' key={index}>
            <img className='img' src={review.firstimage} alt='' onClick={() => navigate(`/place/placedetail`)}/>

            <div style={{width: '-webkit-fill-available'}}>
              <div className='place-wrap'>
                <div className='place'>
                  <span className='title' onClick={() => navigate(`/place/placedetail`)}>{review.title}</span>
                  <span className='cat'>{review.cat3_name} • {review.city_name}</span>
                </div>

                <div className='date'>{review.created_at}</div>
              </div>

              <Rating
                name="stars"
                value={review.stars}
                readOnly
                precision={0.5}
                size="small"
                emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
              />

              <pre className='content'>{review.content}</pre>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ReviewList;