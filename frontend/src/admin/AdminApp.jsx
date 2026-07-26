import AppRoutes from "./routes/AppRoutes";

import useInitializeAuth from "./features/auth/hooks/useInitializeAuth";

import { useSelector } from "react-redux";

import LoadingScreen from "./components/common/LoadingScreen";

function AdminApp() {
  useInitializeAuth();

  const { initialized } = useSelector((state) => state.auth);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return <AppRoutes />;
}

export default AdminApp;
