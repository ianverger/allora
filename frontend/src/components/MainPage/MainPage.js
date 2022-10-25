import LoginForm from "./SessionForms/LoginForm";
import SignupFormModal from "./SessionForms/SignupModal";
import './MainPage.css';
import CarouselUnit from "./Carousel";

function MainPage() {
    return (
      <div id="body">
        <div id="left">
            <div id="intro">
                <div className="logo-wrapper">
                    <img src={'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-logo-pink_adobe_express.png'} alt=""></img>
                </div>
                <p>take a trip!</p>
            </div>
            <div id="break"></div>
            <LoginForm />
            <p>Don't have an account?</p>
            <SignupFormModal />
        </div>
        <div id="right"></div>
        <div className="carousel-unit">
          <CarouselUnit/>
        </div>
      </div>
    );
  }
  
  export default MainPage;