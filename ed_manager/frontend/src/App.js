import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import TeacherHome from './pages/TeacherHome';
import TeacherCreate from './pages/TeacherCreate';
import KnowShowCreate from "./pages/KnowShowCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/' exact element={<TeacherHome />} />
            <Route path='/create' element={<TeacherCreate />} />
            <Route path='/create/knowShowChart' element={<KnowShowCreate />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
