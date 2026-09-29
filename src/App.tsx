import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { MetrikaTracker, ScrollManager } from "./components/layout/RouteEffects";
import CaseDetail from "./pages/CaseDetail";
import Cases from "./pages/Cases";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:slug" element={<CaseDetail />} />
            {/* Старые адреса */}
            <Route path="/skills" element={<Navigate to="/#about" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <MetrikaTracker />
      </BrowserRouter>
    </MotionConfig>
  </LazyMotion>
);

export default App;
