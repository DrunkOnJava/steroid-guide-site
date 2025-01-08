import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MarkdownPage from "./components/MarkdownPage";
import Today from "./pages/Today";
import TrainingNutrition from "./pages/TrainingNutrition";
import CycleOverview from "./pages/CycleOverview";
import Safety from "./pages/Safety";
import Glossary from "./pages/Glossary";
import Compounds from "./pages/Compounds";
import Schedule from "./pages/Schedule";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route
            path="/introduction"
            element={<MarkdownPage filePath="/content/01_introduction.md" />}
          />
          <Route path="/cycle-overview" element={<CycleOverview />} />
          <Route path="/compounds" element={<Compounds />} />
          <Route path="/training-nutrition" element={<TrainingNutrition />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </Router>
  );
}
