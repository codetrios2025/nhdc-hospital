import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function LayoutScreen() {
  console.log("LAYOUT RENDER");

  return (
    <>
      <div style={{ background: "red", color: "white", padding: 10 }}>
        LAYOUT TEST
      </div>

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}