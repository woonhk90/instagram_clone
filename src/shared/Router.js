import { Routes, Route } from "react-router-dom";
import InstarLogin from "../pages/InstarLogin";
import InstarSignup from "../pages/InstarSignup";
import InstarMain from "../pages/InstarMain";
import InstarForm from "../pages/InstarForm";
import InstarView from "../pages/InstarView";
const Router = () => {
    return (
      <Routes>
        <Route path='/' element={<InstarLogin />} />
        <Route path='/signup' element={<InstarSignup />} />
        <Route path='/main' element={<InstarMain />} />
        <Route path='/form' element={<InstarForm />} />
        <Route path='/view' element={<InstarView />} />
        {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
      </Routes>
    );
  };

  export default Router;