import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../screens/Chat";
import Home from "../screens/Home";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default Routing;
