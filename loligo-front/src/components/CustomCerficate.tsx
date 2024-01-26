import CustomCard from "./CustomCard";

export default function CustomCertificate(){
    return(
        <>
        <div className="container" id="myRequestsContainer" style={{
            display: "flex"
         }}>
           <div className="column" style={{
             margin:"1em 1em 0 0",
             flex: "1",
           }}>  <h1 style={{textAlign:"center",
                     fontSize:"4rem",
                     fontWeight:"bolder",
                     lineHeight: "1em",
                     WebkitTextFillColor:"transparent",
                     backgroundImage: "linear-gradient(45deg, #020024, #a516b3)",
                     backgroundClip: "text",
                     margin: ".5em"}}>My certificates
                 </h1>
           </div>
           <div className="column" style={{
             margin:"1em 1em 0 0",
             flex: "1",
             display:"flex",
             alignItems:"center",
             justifyContent: "center"
           }}>
           </div>
           <div className="column" style={{
             margin:"1em 1em 0 0",
             flex: "1",
             display:"flex",
             alignItems:"left",
             justifyContent: "left"
           }}>
           </div>
         </div>
         <CustomCard></CustomCard>
         <CustomCard></CustomCard>
         <CustomCard></CustomCard>
         <CustomCard></CustomCard>
         
        </>
    )
}