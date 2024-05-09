import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import MediaSinglePage from "./pages/MediaSinglePage";
import { MediaProvider } from "./context/MediaContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MediaProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="media-page">
            <Route path=":mediaId" element={<MediaSinglePage />} />
          </Route>
        </Routes>
      </MediaProvider>
    </BrowserRouter>
  );
}

export default App;
