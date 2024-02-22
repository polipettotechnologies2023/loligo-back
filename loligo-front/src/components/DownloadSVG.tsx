import SVGCertificate from "./SVGCertificate";
import ReactDOMServer from "react-dom/server";
import { Button } from "@nextui-org/react";

type SVGProps = {
  cid: string;
};

export default function DownloadSVG({ cid }: SVGProps) {
  const handleDownload = () => {
    const svgContent = ReactDOMServer.renderToStaticMarkup(
      SVGCertificate({ cid })
    );
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = svgUrl;
    a.download = "Certificate.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
