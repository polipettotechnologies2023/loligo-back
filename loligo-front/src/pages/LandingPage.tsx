import LoginButton from '../components/LoginButton';
import background from '../assets/loligo_logo_traced.svg'
import LoginButtonExpert from '../components/LoginButtonExpert';
export default function LandingPage() {

    document.body.style.overflow = "hidden"

    return (
         <>
        <div className="container" style={{
            display:"grid",
            gridTemplateColumns:"repeat(3, 1fr)",
            minHeight: "100vh",
            color :"#fff",
            textAlign:"center",
        }}>
            <div className="block1" style={{
                gridRow:"1 / 5",
                gridColumn: "1 / 4",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                scale: "1.5",
                margin: "50px 0px 0px 200px",
                opacity: "0.5",
                position:"relative"
            }}>text here 1</div>
            <div className="block2" style={{
                gridRow:"1 / 3",
                gridColumn: "2 / 4",
                backgroundPosition:"bottom",
                position:"relative"
            }}><img src="loligo_text_logo.svg" style={{
                scale:".4",
                position:"absolute"
            }}>
                    </img></div>
            <div className="block3" style={{
                gridRow:"3 / 5",
                gridColumn: "2 / 4",
                //background:"dodgerblue"
            }}>
                <h1 style={{textAlign:"center",
                            fontSize:"8rem",
                            fontWeight:"bolder",
                            lineHeight: "1em",
                            WebkitTextFillColor:"transparent",
                            paddingTop:".5em",
                            backgroundImage: "linear-gradient(45deg, #020024, #a516b3)",
                            backgroundClip: "text"}}>
                "ONE TENTACLE TO RULE THEM ALL"</h1>
                <ul style={{ paddingTop: "4em"  ,
                            lineHeight:"5em"
              }}>
                    <li><LoginButton></LoginButton></li>
                    <li><LoginButtonExpert></LoginButtonExpert> </li>
                </ul>
            </div>
        </div>
         </>
         )
       
}