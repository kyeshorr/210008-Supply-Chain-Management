import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StatusCheckPage from "./pages/StatusCheckPage";
import TrackOrder from "./pages/TrackOrder";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TrackOrder />} />
          <Route path="/status" element={<StatusCheckPage />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
