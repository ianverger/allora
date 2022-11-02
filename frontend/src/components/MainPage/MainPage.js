import LoginForm from "./SessionForms/LoginForm";
import SignupFormModal from "./SessionForms/SignupModal";
import './MainPage.css';
import CarouselUnit from "./Carousel";
import Carousel from 'react-bootstrap/Carousel';
import DemoUserButton from "./SessionForms/DemoUser";
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
    return (
      <div id="body">
        <div id="main-left">
            <div id="intro">
                <div className="logo-wrapper">
                    <img src={'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-logo-pink_adobe_express.png'} alt="" />
                </div>
                <p>take a trip!</p>
            </div>
            <div id="break"></div>
            <LoginForm />
            <DemoUserButton />
            <p>Don't have an account?</p>
            <SignupFormModal />
        </div>
        <div id="right"></div>
        <div className="carousel-unit">
          <Carousel indicators={false} controls={false} fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/boxed-water-is-better--mLNxpdLRBk-unsplash.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/nicole-herrero-rWWLpxSefp8-unsplash.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/tron-le-JsuBKjHGDMM-unsplash.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
  
  export default MainPage;