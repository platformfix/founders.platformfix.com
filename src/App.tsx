import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { WorkWithUsPage } from "./pages/WorkWithUsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>
        {/* Deliberately outside <Layout> — no header nav, no footer. The
            work-with-us form is the conversion page; every distraction that
            could lead someone away from submitting it is removed. */}
        <Route path="work-with-us" element={<WorkWithUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
