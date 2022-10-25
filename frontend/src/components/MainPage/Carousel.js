import { Link } from 'react-router-dom';
import Carousel from "better-react-carousel";
// import './Carousel.css';

function CarouselUnit() {

    const imageUrls = [
        'https://hippark-photos.s3.amazonaws.com/allora-pics/boxed-water-is-better--mLNxpdLRBk-unsplash.jpg',
        'https://hippark-photos.s3.amazonaws.com/allora-pics/eddy-billard-JOoOPt8tTPY-unsplash.jpg',
        'https://hippark-photos.s3.amazonaws.com/allora-pics/nicole-herrero-rWWLpxSefp8-unsplash.jpg',
        'https://hippark-photos.s3.amazonaws.com/allora-pics/tron-le-JsuBKjHGDMM-unsplash.jpg'
    ]

      return (
        <div className='carousel-container'>
           <Carousel className="slide" style={{
          width: 350,
          height:220
            }}>
          {imageUrls.map((url, idx) => {
            return (
                <Carousel.Item className="carousel-item" key={idx}>
                  <img className="carousel-pic" src={url} alt="" />
                </Carousel.Item> 
            )
          })}
        </Carousel>
        </div>
      )
       
};

export default CarouselUnit;