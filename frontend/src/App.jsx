import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateCapsule from "./pages/CreateCapsule";
import Journal from "./pages/Journal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"
import CapsuleView from "./pages/CapsuleView";


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
  path="/capsule/:id"
  element={
    <ProtectedRoute>
      <CapsuleView />
    </ProtectedRoute>
  }
/>

        <Route path="/create-capsule" element={
    <ProtectedRoute>
      <CreateCapsule />
    </ProtectedRoute>
  } />
        <Route path="/journal" element={
    <ProtectedRoute>
      <Journal />
    </ProtectedRoute>
  } />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
