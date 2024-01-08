import LoginButton from '../components/LoginButton';

export default function LandingPage() {


    return (
        <>
         <div className="flex justify-center">
         <img src="landingLogo.png" alt="landing logo" /> {/* TODO: this must be an svg and needs to ben full width*/}
         
         </div>
         <LoginButton></LoginButton>
         </>
         )
       
}