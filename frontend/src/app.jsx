import { Routes, Route } from "react-router-dom";

import WebsiteApp from "./WebsiteApp";
import AdminApp from "./admin/AdminApp";

function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Website */}
      <Route path="/*" element={<WebsiteApp />} />
    </Routes>
  );
}

export default App;
