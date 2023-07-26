import { Route, Routes, BrowserRouter } from "react-router-dom";
import Api from "./API/Api";
import DetailsCard from "./pages/DetailsCard";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/pokemon/:id" element={<DetailsCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
