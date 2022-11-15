import LoginForm from "./SessionForms/LoginForm";
import SignupFormModal from "./SessionForms/SignupModal";
import './MainPage.css';
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
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/nicole-herrero-rWWLpxSefp8-unsplash.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/boxed-water-is-better--mLNxpdLRBk-unsplash.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/4356144/pexels-photo-4356144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sixth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Seventh slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/716421/pexels-photo-716421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Eighth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://hippark-photos.s3.amazonaws.com/allora-pics/tron-le-JsuBKjHGDMM-unsplash.jpg"
                alt="Ninth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
  
  export default MainPage;