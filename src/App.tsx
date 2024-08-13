import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React from "react";
const Dashboard = React.lazy(() => import("./components/Dashboard"));
import Landing from "./components/Landing";
import RTSPPlayer from "./components/RtspVideoPlayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar />
        {/* <RTSPPlayer /> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video-player" element={<RTSPPlayer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Go to landing</button>
      <button onClick={() => navigate("/dashboard")}>Go to dashboard</button>
      <button onClick={() => navigate("/video-player")}>
        Go to video player
      </button>
    </div>
  );
}

export default App;
