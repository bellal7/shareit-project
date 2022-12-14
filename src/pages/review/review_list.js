import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../asset/scss/review.scss';

function ReviewList() {
  const navigate = useNavigate();
  const [tabSelected, setTabSelected] = useState(0);
  const [dropdown, setDropdown] = useState(null);
  const [toggle, setToggle] = useState(null);
  const [productData, setProductData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    setTabSelected(0)
  }, []);
  const fetchProduct = () => {
    axios
      .get(
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/531d14ae-0574-4b4a-b276-2bcb784739d6/availableData.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221210T122945Z&X-Amz-Expires=86400&X-Amz-Signature=9bc730b036b246899c829382e9493de80eed60d03e02112a23b8a74593a0affe&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22availableData.json%22&x-id=GetObject"
      )
      .then(function (response) {
        console.log(response)
        setProductData(response.data)
      })
      .catch(function (error) {
        console.log("setProductData", error);
      });
  };
  const fetchReview = () => {
    axios
      .get(
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a2bbfaa1-416f-4126-9da5-9cd4152b2cb9/reviewData.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221210T114927Z&X-Amz-Expires=86400&X-Amz-Signature=e6ad9e62ede2751d5765af8d77e3ab201cf2cc852152b88bd15f1ac5e0b0e0d9&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22reviewData.json%22&x-id=GetObject"
      )
      .then(function (response) {
        setReviewData(response.data)
      })
      .catch(function (error) {
        console.log("setReviewData", error);
      });
  };
  const changeTab = (idx) => {
    if (idx === 0) {
      setTabSelected(0);
    } else if (idx === 1) {
      setTabSelected(1);
    } 
  };
  const clickHandler = (index,arg) => {
    if(arg === 'review') {
      setDropdown((prev) => {
        return prev === index ? null : index;
      });
    }else {
      setToggle((prev) => {
        return prev === index ? null : index;
      });
    }
    console.log('clicked', index);
  };
  useEffect(() => {
    fetchProduct();
    fetchReview();
  }, []);
  return (
    <>
      <h2>후기 관리</h2>
      <ul className="tab">
        <li className={tabSelected === 0 ? `isSelected` : ``} onClick={() => changeTab(0)}>작성가능 후기 (<span>{productData.length}</span>)</li>
        <li className={tabSelected === 1 ? `isSelected` : ``} onClick={() => changeTab(1)}>작성한 후기 (<span>{reviewData.length}</span>)</li>
      </ul>
      <div className="review_content">
        {tabSelected === 0 ? ( 
          <>
            {/* 작성가능후기 */}
            <ul className="review_list">
              {productData.length > 0 && (
                <>
                  {
                    productData.map((item, idx) => {
                      const { reserveAt, deadLine } = item.review;
                      const { hostImage,hostName,spaceName,productName,productType } = item.product;
                      return (
                        <li key={idx} className="review_item">
                          <div className="product_box">
                            <span className="thumb"><img src={hostImage} alt="이미지" /></span>
                            <div className="title">
                              <p className="name">{hostName}</p>
                              <strong>{spaceName}</strong>
                            </div>
                          </div>
                          <div className="info_box">
                            <ul>
                              <li>
                                <span className="name">상품명</span>
                                <span className="desc product_desc">{productType && <span className="ico_live">{productType}</span>}{productName}</span>
                              </li>
                              <li>
                                <span className="name">예약일자</span>
                                <span className="desc">{reserveAt}</span>
                              </li>
                              <li>
                                <span className="name">작성기한</span>
                                <span className="desc">{deadLine}</span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn_write" onClick={() => navigate('/review_write')}>후기 쓰기</button>
                        </li>
                      );
                    })
                  }
                </>
              )} 
            </ul>
            <div className="desc_box">
              <p className="desc_text">고객님의 이용후기를 사진으로 <br />다양하게 표현해 보세요!</p>
              <p className="alert">서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다.</p>
            </div>
          </> 
        ) : ( 
          <>
            {/* 작성한후기 */}
            <ul className="review_list myReview">
              {reviewData.length > 0 && (
                reviewData.map((item, i) => {
                  const { reserveAt, createAt, review, reply } = item.review;
                  const { hostImage,hostName,isHostPick,like,productName,productType,rating,spaceName } = item.product;
                  return (
                    <li key={i} className="review_item">
                      <div className="product_box">
                        <span className="thumb"><img src={hostImage} alt="이미지" /></span>
                        <div className="title">
                          <p className="name">{hostName}</p>
                          <strong>{spaceName}</strong>
                        </div>
                      </div>
                      <div className="info_box">
                        <ul>
                          <li>
                            <span className="name">상품명</span>
                            <span className="desc product_desc">{productType && <span className="ico_live">{productType}</span>}{productName}</span>
                          </li>
                          <li>
                            <span className="name">예약일자</span>
                            <span className="desc">{reserveAt}</span>
                          </li>
                          <li>
                            <span className="name">작성일자</span>
                            <span className="desc">{createAt}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="review_box">
                        <p className={`review_title ${dropdown === i ? `isActive` : ``}`}
                        onClick={() => {
                          clickHandler(i,'review')
                        }}>작성한 후기 <span className="ico_star">{rating}</span>{like && <span className="ico_like">{like}</span>}{isHostPick && <span className="ico_pick">호스트 PICK</span>}</p>
                        <div className="review_text">
                          <p>{review}</p>
                        </div>
                        <p className={`review_title ${toggle === i ? `isActive` : ``}`}
                        onClick={() => {
                          clickHandler(i,'reply')
                        }}>판매자 답변</p>
                        <div className="review_text reply">
                          <p>{reply}</p>
                        </div>
                      </div>
                    </li>
                  );
                })
              )} 
            </ul>
            <div className="desc_box">
              <p className="desc_text">고객님의 이용후기를 사진으로 <br />다양하게 표현해 보세요!</p>
              <p className="alert">서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다.</p>
            </div>
          </> 
        )}
      </div>
    </>
  );
}

export default ReviewList;
