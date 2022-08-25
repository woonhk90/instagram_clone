import { Routes, Route } from "react-router-dom";
import InstarLogin from "../pages/InstarLogin";
import InstarSignup from "../pages/InstarSignup";
import InstarMain from "../pages/InstarMain";
import InstarForm from "../pages/InstarForm";
import InstarView from "../pages/InstarView";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const Router = () => {
  const cookies = new Cookies();
  const refresh_token = cookies.get("Authorization");
console.log("HEADER=>",refresh_token);
  return (
    <Routes>
      <Route path='/' element={<InstarLogin />} />
      <Route path='/signup' element={<InstarSignup />} />
      <Route path='/main' element={<InstarMain />} />
      {/* {refresh_token !== undefined ? <Route path='/main' element={<InstarMain />} /> : <Route path='/main' element={<Navigate to="/" />} />} */}
      <Route path='/form' element={<InstarForm />} />
      <Route path='/view' element={<InstarView />} />
      {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
    </Routes>
  );
};

export default Router;