import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuthStore } from "./store/auth";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Workspace = lazy(() => import("./layouts/workspace"));

function App() {
  const { user } = useAuthStore();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/workspace/channel/general" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace/*" element={<Workspace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
