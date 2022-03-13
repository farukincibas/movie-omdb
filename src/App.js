import "./App.css";
import Home from "./pages/Home";
import AboutMovie from "./pages/AboutMovie";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about/:id" element={<AboutMovie />} />
      </Routes>
    </>
  );
}

export default App;
