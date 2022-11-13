import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout, PageLayout, ProtectedLayout } from "./layouts";
import "./App.css";
import Account from "./pages/Account";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

const About = React.lazy(() => import("./pages/About"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Reset = React.lazy(() => import("./pages/Reset"));
const Confirm = React.lazy(() => import("./pages/Confirm"));

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
  {
    path: "/about",
    component: About,
  },
  {
    path: "/terms",
    component: Terms,
  },
  {
    path: "/privacy",
    component: Privacy,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/reset",
    component: Reset,
  },
  {
    path: "/confirm",
    component: Confirm,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/account"
          element={
            <ProtectedLayout>
              <Account />
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

        <Route path="/*" element={<PageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
