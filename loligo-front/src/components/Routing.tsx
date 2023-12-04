import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NewRequest from "../pages/NewRequest";

export default function Routing() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="newrequest" element={<NewRequest />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );

}