import { createBrowserRouter } from "react-router";
import HomePage from "../imports/HomePage";
import Speakers from "../imports/Speakers";
import GetInvolved from "../imports/GetInvolved";
import Awards from "../imports/Awards";
import Tickets from "../imports/Tickets";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/speakers", Component: Speakers },
  { path: "/get-involved", Component: GetInvolved },
  { path: "/awards", Component: Awards },
  { path: "/tickets", Component: Tickets },
]);
