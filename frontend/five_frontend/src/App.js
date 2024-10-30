import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import B2CLoginPage from "./components/B2C/auth/LoginPage";
import B2CRegistrationPage from "./components/B2C/auth/RegistrationPage";
import B2BLoginPage from "./components/B2B/auth/LoginPage";
import B2BRegistrationPage from "./components/B2B/auth/RegistrationPage";
import LayoutTestPage from "./components/layout/LayoutTestPage";
import ProfileB2C from "./components/profilePages/ProfileB2C";
import ProfileB2B from "./components/profilePages/ProfileB2B";
import VolunteerOffers from "./components/B2C/VolunteerOffers";
import VolunteerOfferDetail from "./components/B2C/VolunteerOfferDetail";
import Dashboard from "./components/B2B/Dashboard";
import EngagementDetail from "./components/B2B/EngagementDetail";
import CreateEngagement from "./components/B2B/CreateEngagement";
import TimeDonation from "./components/B2C/TimeDonation";
import B2CPostFach from "./components/B2C/B2CPostfach"
import B2BPostFach from "./components/B2B/B2BPostfach"
import OverviewPage from "./components/B2B/OverviewPage"
import ContactPage from "./components/Contact/ContactPage"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/b2c/login" element={<B2CLoginPage />} />
          <Route path="/b2c/register" element={<B2CRegistrationPage />} />
          <Route path="/b2b/login" element={<B2BLoginPage />} />
          <Route path="/b2b/register" element={<B2BRegistrationPage />} />
          <Route path="/b2c/profile" element={<ProfileB2C />} />
          <Route path="/b2b/profile" element={<ProfileB2B />} />
          <Route path="/b2c/angebote" element={<VolunteerOffers />} />
          <Route path="/b2c/angebote/:id" element={<VolunteerOfferDetail />} />
          <Route path="/b2b/dashboard" element={<Dashboard />} />
          <Route path="/b2b/engagement/:engagement_id" element={<EngagementDetail />} />
          <Route path="/b2b/create" element={<CreateEngagement />} />
          <Route path="/b2c/zeitspende" element={<TimeDonation />} />
          <Route path="/b2c/postfach" element={<B2CPostFach />} />
          <Route path="/b2b/postfach" element={<B2BPostFach />} />
          <Route path="/b2b/organisationen" element={<OverviewPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* TODO delete testpage later */}
          <Route path="/layoutTest" element={<LayoutTestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
