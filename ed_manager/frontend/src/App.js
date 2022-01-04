import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import TeacherHome from './pages/TeacherHome';
import TeacherCreate from './pages/TeacherCreate';
import KnowShowCreate from "./pages/KnowShowCreate";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAssessment from "./pages/CreateAssessment";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <AuthProvider>
          <NavBar />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' exact element={<TeacherHome />} />
              <Route path='/create' element={<TeacherCreate />} />
              <Route path='/create/knowShowChart' element={<KnowShowCreate />} />
              <Route path='/create/assessment' element={<CreateAssessment/>} />
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
