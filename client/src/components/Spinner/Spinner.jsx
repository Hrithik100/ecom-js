import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-Center">redirecting to you in {count} second</h1>
        <CircularProgress />
      </div>
    </>
  );
};

export default Spinner;
