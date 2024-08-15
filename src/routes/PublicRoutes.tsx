import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from "../pages/contactPage/ContactPage";
import MapPage from "../pages/mapPage/MapPage";

const PublicRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<ContactPage />} />
        <Route path="/charts-maps" element={<MapPage />} />
      </Routes>
    );
  };
  
  export default PublicRoutes;