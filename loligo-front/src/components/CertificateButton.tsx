import {
  Page,
  Text,
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
    fontSize: 48,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  subtitle: {
    fontSize: 22,
    margin: 12,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  company: {
    fontSize: 34,
    margin: 12,
    textAlign: "center",
    fontFamily: "Courier-Bold",
  },
  emptyLine: {
    marginBottom: 20,
  },
  text: {
    margin: 12,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

const company_name = "test company";
const website_url = "https://polipetto.pp.ua";
// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        Polipetto Technologies
      </Text>
      <Text style={styles.title}>CERTIFICATE</Text>
      <Text style={styles.subtitle}>OF DARK PATTERNS FREE</Text>
      <Text style={styles.subtitle}>ACKNOWLEDGES THAT</Text>
      <Text style={styles.emptyLine} />
      <Text style={styles.text}>The Website {website_url} of</Text>
      <Text style={styles.emptyLine} />
      <Text style={styles.company}>{company_name}</Text>
      <Text style={styles.emptyLine} />
      <Text style={styles.text}>
        Has passed all of the dark patterns detection
      </Text>
      <Text style={styles.text}>provided by Loligo</Text>
      <Text style={styles.text}>
        and was proved to be free of the following dark patterns:
      </Text>
      <Text style={styles.text}>List of dark patterns tba.</Text>
    </Page>
  </Document>
);

export default function CertificateButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        preview pdf
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
                  <MyDocument />
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
                  document={<MyDocument />}
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
