import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import Products from "./components/pages/Products";
import Careers from "./components/pages/Careers";
import PartnerApplication from "./components/pages/PartnerApplication";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutUs },
      { path: "products", Component: Products },
      { path: "careers", Component: Careers },
      { path: "partner-application", Component: PartnerApplication },
    ],
  },
]);
