import { Button } from "@nextui-org/react";

export default function SvgButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "loligo_certificate.svg";
    link.download = "CertificateSVG.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      className="bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-500 text-white"
      onClick={handleDownload}
    >
      Download SVG
    </Button>
  );
}
