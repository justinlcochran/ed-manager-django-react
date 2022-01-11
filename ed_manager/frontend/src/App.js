
import './App.css';
import NavBar from './components/NavBar';
import TeacherHome from './pages/TeacherHome';
import TeacherCreate from './pages/TeacherCreate';
import CreateKnowShow from "./pages/CreateKnowShow";
import AuthContext, {AuthProvider} from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAssessment from "./pages/CreateAssessment";
import {CreateAssessmentProvider} from "./context/CreateAssessmentContext";
import {StandardContextProvider} from "./context/StandardContext";
import ViewAssessment from "./pages/ViewAssessment";
import CreateEnrollment from "./pages/CreateEnrollment";

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
              <Route path='/create/enrollment' element={<CreateEnrollment />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
