import LoginForm from "./SessionForms/LoginForm";
import SignupFormModal from "./SessionForms/SignupModal";
import './MainPage.css';
import CarouselUnit from "./Carousel";

function MainPage() {
    return (
      <div id="body">
        <div id="left">
            <div id="intro">
                <h1>allora</h1>
                <p>take a trip!</p>
            </div>
            <div id="break"></div>
            <LoginForm />
            <p>Don't have an account?</p>
            <SignupFormModal />
        </div>
        <div id="right"></div>
        <div>
          <CarouselUnit/>
        </div>
      </div>
    );
  }
  
  export default MainPage;