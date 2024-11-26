import Navbar from './layouts/Navbar';
import { Routes, Route } from 'react-router-dom';
import ArticleDetail from './pages/ArticleDetail';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import { DotLoader } from 'react-spinners';
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './layouts/Footer';
import { LoginPage } from './pages/LoginPage';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLoader color="#6B4DE6" /> {/* TODO: make these colors into const*/}
      </div>
    );
  }

  return (
    <div data-theme="light">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
