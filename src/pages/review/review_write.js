import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../../asset/scss/review.scss';

function ReviewWrite() {
  const navigate = useNavigate();
  SwiperCore.use([Navigation, Pagination]);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(<><input type="radio" id={`stars-${i}`} name="rating" value={i} />
      <label htmlFor={`stars-${i}`} className="star">★</label></>);
    }
    return result;
  };
  return (
    <div className="review_write">
      <h2>후기 상세</h2>
      <button className="btn_delete">삭제</button>
      <div className="review_item">
        <div className="product_box">
          <span className="thumb"><img src="" alt="이미지" /></span>
          <div className="title">
            <p className="name">호스트명호스트명</p>
            <strong>공간명</strong>
          </div>
        </div>
        <div className="info_box">
          <ul>
            <li>
              <span className="name">상품명</span>
              <span className="desc"><span className="ico_live">실시간</span>productName</span>
            </li>
            <li>
              <span className="name">예약일자</span>
              <span className="desc">reserveAt</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="write_box star_write">
        <strong className='isRequired'>서비스 만족도를 선택해 주세요</strong>
        <div className="star_box">
          <p className="star_title">선택하세요</p>
          <div className="star_rating">
            {rendering()}
          </div>
          <p className="alert">별점은 1점 이상이어야 합니다.</p>
        </div>
      </div>
      <div className="write_box">
        <strong className='isRequired'>사용후기를 작성해 주세요 (6자 이상)</strong>
        <textarea cols="30" rows="10" placeholder='서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다.'></textarea>
        <div><span className='alert'>후기는 6자 이상 입력해 주세요.</span><span className="count">0/1,000</span></div>
      </div>
      <div className="attach_box">
        <strong>포토 첨부 (최대 5장)</strong>
        <div className="swiper_box">
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide><img src="https://place-hold.it/180x180" alt="" /><button className="ico_del">삭제</button></SwiperSlide>
            <SwiperSlide><img src="https://place-hold.it/180x180" alt="" /><button className="ico_del">삭제</button></SwiperSlide>
            <SwiperSlide><img src="https://place-hold.it/180x180" alt="" /><button className="ico_del">삭제</button></SwiperSlide>
            <SwiperSlide><img src="https://place-hold.it/180x180" alt="" /><button className="ico_del">삭제</button></SwiperSlide>
            <SwiperSlide><img src="https://place-hold.it/180x180" alt="" /><button className="ico_del">삭제</button></SwiperSlide>
          </Swiper>
        </div>
        <div><span className='alert'>이미지 파일만 등록해 주세요.</span><span className="count">포토당 최대 15MB</span></div>
      </div>
      <div className="write_box">
        <strong>판매자에게 전달하고 싶은 메시지</strong>
        <textarea cols="30" rows="10" placeholder='서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다.'></textarea>
        <div><span className="count">0/1,000</span></div>
      </div>
      <div className="agree_box">
        <p className='checkbox'><label htmlFor="agree"><input type="checkbox" id="agree" />구매후기 약관 동의 (필수)</label></p>
        <div className="notice">
          <p>후기 등록 유의사항</p>
          <ul>
            <li>후기 작성은 사용 완료 후 6 개월 이내 작성이 가능합니다.</li>
            <li>이미지는 최대 5 개까지 등록 가능하며, 이미지 개수와 상관없이 포인트는 1회만 지급됩니다.</li>
            <li>서비스 이용과 무관하거나 욕설, 광고, 음란, 저작권 침해 내용 등록 시 사전협의 없이 삭제할 수 있습니다.</li>
            <li>작성된 후기 및 사진은 쉐어잇 마케팅에 활용될 수 있습니다.</li>
            <li>고객이 등록하는 게시물로 인해 발생하는 분쟁에 대한 민사 형사 행정상 법적 책임은 게시자에 있고, 쉐어잇은 어떠한 책임도 부담하지 않습니다.</li>
          </ul>
        </div>
      </div>
      <div className="btn_box">
        <button className='btn_cancle' onClick={() => navigate(-1)}>취소</button>
        <button className='btn_save'>저장</button>
      </div>
    </div>
  );
}

export default ReviewWrite;
