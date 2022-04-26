import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/unauthorized/Login/Login";
import Dashboard from "./screens/authorized/Dashboard/Dashboard";

import "./App.css";
import Layout from "./utils/Layout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          {/* protected routes */}
          {/* <Route element={<RequireAuth />}>
              <Route path="/" element={<Dashboard />} />
            </Route> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
