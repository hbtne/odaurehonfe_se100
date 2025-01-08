import './App.css';
import { BrowserRouter, Routes, Route, Navigate,main } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import NavbarAdmin from './components/Navbar/NavbarAdmin';
import NavbarTicketClerk from './components/Navbar/NavbarTicketClerk';
import NavbarDriver from './components/Navbar/NavbarDriver';
import Footer from './components/Footer/Footer';
import MainScreenCus from './screens/Customer/main/mainScreen_Cus'; 
import SearchRouteScreen from './screens/Customer/search/searchScreen';
import SearchRouteScreen_clerk from './screens/TicketClerk/search/searchScreen';
import ChooseSeat_1way from './screens/Customer/chooseSeatScreen/chooseSeatScreen1way';
import ChooseSeat_round_clerk from './screens/TicketClerk/chooseSeatScreen/chooseSeatScreenround';
import ChooseSeat_1way_clerk from './screens/TicketClerk/chooseSeatScreen/chooseSeatScreen1way';
import ChooseSeat_round from './screens/Customer/chooseSeatScreen/chooseSeatScreenround';
import FillInfor_1way from './screens/Customer/fillInfor/fillInforScreen1way';
import FillInfor_round from './screens/Customer/fillInfor/fillInforScreenround';
import LookUpTicket from './screens/Customer/LookUp/lookUpTicket';
import LookUpTicketstaf from './screens/TicketClerk/LookUpTicket';
import BookingHistory from './screens/Customer/HistoryBooking/HistoryBookingScreen';
import ViewSchedule from './screens/Driver/ViewScheduleScreen';
import ManageAccount from './screens/Admin/Account/manageAccScreen';
import ManageTicket from './screens/Admin/Ticket/manageTicketScreen';
import ManageBus from './screens/Admin/Bus/manageBusScreen';
import ManageBusRoute from './screens/Admin/BusRoute/manageBusRouteScreen';
import SignUpScreen from './screens/Auth/SignUp/SignUpScreen';
import SignInScreen from './screens/Auth/SignIn/SignInScreen';
import ForgotPass_Mail from './screens/Auth/ForgetPassword/ForgetPassword_enterEmail';
import ForgotPass_Pin from './screens/Auth/ForgetPassword/ForgetPass_Pin';
import ForgotPass_RePass from './screens/Auth/ForgetPassword/ForgotPass_RePass';
import Promtion from './screens/Admin/Promotion/managePromotiontScreen';
import Report from './screens/Admin/Report/ReportScreen';
import ChooseRouteChange from './screens/Customer/chooseRouteChange/chooseRouteChange';
import Notification from './screens/TicketClerk/NotificationList/NotificationList'
import ChangeTicket from './screens/TicketClerk/ChangeTicket/ChangeTicket';
function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/mainCus" element={<MainScreenCus />} />
        <Route path="/searchScreen" element={<SearchRouteScreen />} />
        <Route path="/chooseRouteChange/:ticketId" element={<ChooseRouteChange />} />
        <Route path="/chooseseat1way/:busBusRouteID" element={<ChooseSeat_1way />} />
        <Route path="/chooseseatround/:busBusRouteDepartureID/:busBusRouteReturnID" element={<ChooseSeat_round />} />
        <Route path="/fillinfor1way" element={<FillInfor_1way />} />
        <Route path="/fillinforround" element={<FillInfor_round />} />
        <Route path="/lookupticket" element={<LookUpTicket />} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/manageacc" element={<ManageAccount />} />
        <Route path="/manageticket" element={<ManageTicket />} />
        <Route path="/managebus" element={<ManageBus />} />
        <Route path="/managebusroute" element={<ManageBusRoute />} />
        <Route path="/managepromotion" element={<Promtion />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </>
  );
}

function TicketClerkLayout() {
  return (
    <>
      <NavbarTicketClerk />
      <Routes>
        <Route path="/searchScreen" element={<SearchRouteScreen_clerk />} />
        <Route path="/changeTicket/:notificationId" element={<ChangeTicket />} />
        <Route path="/chooseseat1way/:busBusRouteID" element={<ChooseSeat_1way_clerk />} />
        <Route path="/chooseseatround/:busBusRouteDepartureID/:busBusRouteReturnID" element={<ChooseSeat_round_clerk />} />
        <Route path="/lookupticketstaff" element={<LookUpTicketstaf />} />
        <Route path="/notification" element={<Notification/>} />

      </Routes>
      <Footer />
    </>
  );
}

function DriverLayout() {
  return (
    <>
      <NavbarDriver />
      <Routes>
        <Route path="/viewschedule" element={<ViewSchedule />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/customer/*" element={<CustomerLayout />} />

          <Route path="/admin/*" element={<AdminLayout />} />

          <Route path="/ticketclerk/*" element={<TicketClerkLayout />} />

          <Route path="/driver/*" element={<DriverLayout />} />

          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/fpmail" element={<ForgotPass_Mail />} />
          <Route path="/fppin" element={<ForgotPass_Pin />} />
          <Route path="/fprepass" element={<ForgotPass_RePass />} />

          <Route path="*" element={<SignInScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;