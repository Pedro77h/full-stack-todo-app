import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Navigate to="/" />
    </BrowserRouter>
  );
};
