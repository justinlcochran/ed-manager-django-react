import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import TeacherHome from './pages/TeacherHome';
import TeacherCreate from './pages/TeacherCreate';
import CreateKnowShow from "./pages/CreateKnowShow";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAssessment from "./pages/CreateAssessment";
import {CreateAssessmentProvider} from "./context/CreateAssessmentContext";
import StandardContext, {StandardContextProvider} from "./context/StandardContext";
import ViewAssessment from "./pages/ViewAssessment";

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
                  <Route path='/create/knowShowChart' element={
                    <StandardContextProvider>
                      <CreateKnowShow />
                    </StandardContextProvider>} />
                  <Route path='/create/assessment' element={
                    <StandardContextProvider>
                      <CreateAssessmentProvider>
                        <CreateAssessment/>
                      </CreateAssessmentProvider>
                    </StandardContextProvider>} />
              <Route path='/viewassessment' element={<ViewAssessment />} />
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
