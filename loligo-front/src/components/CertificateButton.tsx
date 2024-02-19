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

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  title: {
    fontSize: 44,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  company: {
    fontSize: 32,
    margin: 12,
    textAlign: "center",
    fontFamily: "Courier-Bold",
  },
  emptyLine: {
    marginBottom: 20,
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    height: 120,
    width: 120,
  },
  imagecontainer: { alignItems: "center", justifyContent: "center" },
  footercontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  footertext: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
});

type CertificateProps = {
  company_name: string;
  website_url: string;
};

// Create Document Component
const MyDocument = ({ company_name, website_url }: CertificateProps) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        Polipetto Technologies
      </Text>
      <View style={styles.imagecontainer}>
        <Image style={styles.image} src="certificate_purple.png" />
      </View>
      <Text style={styles.title}>CERTIFICATE</Text>
      <Text style={styles.subtitle}>OF DARK PATTERNS FREE</Text>
      <Text style={styles.subtitle}>ACKNOWLEDGES THAT</Text>
      <Text style={styles.emptyLine} />
      <Text style={styles.text}>The Website {website_url} of</Text>
      <Text style={styles.company}>{company_name}</Text>
      <Text style={styles.emptyLine} />
      <Text style={styles.text}>
        Has passed all of the dark patterns detection provided by Loligo
      </Text>
      <Text style={styles.text}>
        and was proved to be free of the following dark patterns:
      </Text>
      <Text style={styles.text}>
        Fake Activity, Fake Countdown, Confirmshaming, Low Stock Messages,
        Disguised Ads, Fake Scarcity,
      </Text>
      <Text style={styles.text}>
        Fake Social Proof, Forced Action, Hard to Cancel, Hidden Costs, Hidden
        Subscription, Nagging,
      </Text>
      <Text style={styles.text}>
        Obstruction, Preselection, Sneaking, Trick Wording, Visual Interference,
        Comparison Prevention.
      </Text>
      <Text style={styles.emptyLine} />
      <View style={styles.footercontainer}>
        <Text style={styles.footertext}>Date</Text>
        <Text style={styles.footertext}>Signature</Text>
      </View>
      <View style={styles.footercontainer}>
        <Text style={styles.footertext}>Fake Date</Text>
        <Text style={styles.footertext}>Polipetto Technologies</Text>
      </View>
    </Page>
  </Document>
);

export default function CertificateButton({
  company_name,
  website_url,
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
                    />
                  }
                  fileName="TestCertificate.pdf"
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: "#6E2DC1",
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
