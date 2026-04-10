import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import BrowseNotes from "./pages/BrowseNotes";
import MyNotes from "./pages/MyNotes";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./context/AuthContext";
import "./App.css"
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='*' element={<PageNotFound/>} />
          <Route path="/" element={<SignUp />} />

          <Route path="/signin" element={<SignIn />} />

          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadNotes />
            </ProtectedRoute>
          } />
          <Route path="/browse" element={
            <ProtectedRoute>
              <BrowseNotes />
            </ProtectedRoute>
          } />
          <Route path="/my-notes" element={
            <ProtectedRoute>
              <MyNotes />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;