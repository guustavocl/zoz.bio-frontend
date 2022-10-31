import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout, ProfileLayout, ProtectedLayout } from "./layouts";
import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/edit"
          element={
            <ProtectedLayout>
              <h2>aqui é o profile</h2>
            </ProtectedLayout>
          }
        />

        {publicRoutes.map(({ path, component: Component }, id) => (
          <Route
            key={id}
            path={path}
            element={
              <PublicLayout>
                <Component />
              </PublicLayout>
            }
          />
        ))}

        <Route path="/*" element={<ProfileLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
