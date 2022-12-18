import logo from './logo.svg';
import './App.css';
import VerificationPage from "./pages/verification";
import ErrorAlert from "./components/alerts/ErrorAlert";
import SuccessModal from "./components/alerts/SuccessModal";
import React from "react";

function App() {
  return (
    <div className="App flex grow h-full bg-ice-cream-bg lg:bg-contain bg-center min-h-full w-screen bg-cover">
      <VerificationPage/>
    </div>
  );
}

export default App;
