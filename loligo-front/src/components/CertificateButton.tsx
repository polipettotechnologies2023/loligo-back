import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

Font.register({ family: 'Roboto', src: "https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Work+Sans:wght@500&display=swap", fontWeight:"ultrabold", fontStyle:"normal"  });


const styles = StyleSheet.create({
  body: {
    margin: "5px auto",
  },
  header: {
    height: "50px",
    backgroundColor: "#4E3E88",
    display: "flex",
    flexDirection: "row",
    //justifyContent:"center",
  },

  footer:{
    color: "white",
    height: "50px",
    backgroundColor: "#4E3E88",
    display: "flex",
    //marginTop: "5%",
    width: "100%",
    position: "absolute",
    bottom: "5px",
  },

  certifiedLogo: {
    height: "325px", 
    width:"325px", 
    margin: "10px auto"
  },

  polipettoLogo:{
    height:"40%",
    width: "10%",
    margin: "auto 0 auto 65%",
    alignContent: "flex-end",
  },

  loligoLogo:{
    height:"40%",
    width: "15%", 
    margin: "auto 0 auto 5%",
    alignContent: "flex-start",
  },

  heading1: {
    margin: "5px auto",
    fontSize: "40px",
    fontWeight: "extrabold",
    fontStyle: "oblique",
    fontFamily: "Helvetica",
  },

  heading2: {
    fontSize: "15px",
    fontWeight: "extrabold",
    fontStyle: "oblique",
    fontFamily: "Helvetica",
    margin: "5px auto",
  },

  container1:{
    margin: "auto",
    left: "0px",
    right: "10px",
    marginRight: "5%",
  },

  container2:{
    textAlign: "center",
    margin: "auto",
    left: "10px",
    right: "10px",
  },

  bodyMiddle:{
    display: "flex",
    flexDirection: "row",
    margin: "10px auto"
  },

  paragraph:{
    textAlign: "center",
    margin: "auto"
  },
  
  footercontainer1: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: 0
  },
  footercontainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 40,
    marginTop: 0

  },
  imagesignature: {
    height: 90,
    width: 160,
    marginLeft: 40,
  },

});

type CertificateProps = {
  company_name: string;
  website_url: string;
  certify_date: string;
  cid: string;
};

// Create Document Component
const MyDocument = ({
  company_name,
  website_url,
  certify_date,
  cid,
}: CertificateProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.body}>
      <View style={styles.header}>
        <Image src="loligo_text_white.png" style={styles.loligoLogo}></Image>
        <Image src="polipetto_tech_white.png" style={styles.polipettoLogo}></Image>
      </View>
      <View style={styles.body}>
        <Text style={styles.heading1}>CERTIFICATE OF COMPLIANCE</Text>
        <Text style={styles.heading2}>Hereby is certified that the below mentioned website is free of dark patterns.</Text>
        <Text style={styles.heading2}>Succesfully assesed through Loligo powered by Polipetto Technologies</Text>
        <View style={styles.bodyMiddle}>
          <View style={styles.container1}>
            <Image src="certificate_purple.png" style={styles.certifiedLogo}></Image>
          </View>
          <View style={styles.container2}>
            <Text style={styles.paragraph}>Issued to:</Text>
            <Text style={styles.paragraph}>{company_name}</Text>
            <Text style={styles.paragraph}>Domain:</Text>
            <Text style={styles.paragraph}>{website_url}</Text>
            <View style={styles.footercontainer1}>
              <Text>Date</Text>
              <Text>Signature</Text>
            </View>
            <View style={styles.footercontainer2}>
              <Text>{certify_date}</Text>
              <Image style={styles.imagesignature} src="polipetto_signature.png" />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{margin: "auto auto"}}>Certificate ID: {cid}</Text>
      </View>
    </Page>
  </Document>
);

export default function CertificateButton({
  company_name,
  website_url,
  certify_date,
  cid,
}: CertificateProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-500 text-white"
        onPress={onOpen}
      >
        Preview Certificate
      </Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Preview of Your Certificate
              </ModalHeader>
              <ModalBody>
                <PDFViewer height="400" showToolbar={false}>
                  <MyDocument
                    company_name={company_name}
                    website_url={website_url}
                    certify_date={certify_date}
                    cid={cid}
                  />
                </PDFViewer>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  radius="full"
                  onPress={onClose}
                >
                  Close
                </Button>
                <PDFDownloadLink
                  document={
                    <MyDocument
                      company_name={company_name}
                      website_url={website_url}
                      certify_date={certify_date}
                      cid={cid}
                    />
                  }
                  fileName="Certificate.pdf"
                  style={{
                    borderRadius: "9999px",
                    background: "linear-gradient(90deg,  #38bdf8 0%, #0ea5e9 49%, #3b82f6 76%)",
                    color: "white",
                    padding: "10px 16px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  {({ loading }) =>
                    loading ? "Loading document..." : "Download"
                  }
                </PDFDownloadLink>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
