import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MarkdownPage from "./components/MarkdownPage";
import CycleOverview from "./pages/CycleOverview";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<MarkdownPage filePath="/content/01_introduction.md" />}
          />
          <Route path="/cycle-overview" element={<CycleOverview />} />
          <Route
            path="/compounds"
            element={
              <MarkdownPage filePath="/content/03_pharmacological_profiles.md" />
            }
          />
          <Route
            path="/training-nutrition"
            element={
              <MarkdownPage filePath="/content/04_training_nutrition.md" />
            }
          />
          <Route
            path="/glossary"
            element={<MarkdownPage filePath="/content/05_glossary.md" />}
          />
          <Route
            path="/safety"
            element={
              <MarkdownPage filePath="/content/06_safety_considerations.md" />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
