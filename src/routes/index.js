import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardContainer from "../modules/dashboard/DashboardContainer";
import MemberContainer from "../modules/member/MemberContainer";
import SharedLayout from "../pages/sharedlayout";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<DashboardContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
