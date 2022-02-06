import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import NoPage from "../components/ui/NoPage";

const ProtectedWrapper = () => {
  let navigate = useNavigate();

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const signedInUser = JSON.parse(
      window.localStorage.getItem("signedInUser")
    );
    if (signedInUser) {
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
      //   if user is logged in, navigate
      navigate("./signin");
    }
  }, [navigate]);

  return (
    <div>
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
};

export default ProtectedWrapper;
