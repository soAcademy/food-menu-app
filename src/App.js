import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Order } from "./pages/Order";
import { Analytics } from "./pages/Analytics";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </BrowserRouter>
);

export default App;
