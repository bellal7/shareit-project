
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewList from './review_list'
import ReviewWrite from './review_write'
import '../../asset/scss/review.scss';

function Review() {
  return (
    <div className="review">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/review_write" element={<ReviewWrite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Review;
