import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProtectedWrapper from "./components/ProtectedWrapper";

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">Team Management</h1>
      </header>

      <div className="app-body">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route exact path="signup" element={<SignUp />} />
              <Route exact path="signin" element={<SignIn />} />
              {/* use a protected route to check if user is logged in */}
              <Route path="*" element={<ProtectedWrapper />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
