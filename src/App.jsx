import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssessmentForm from "./components/AssessmentForm";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={
          <div className="min-h-screen bg-gray-50 pb-12">
            <AssessmentForm />
          </div>
        } />
      </Routes>
    </Router>
  );
}
