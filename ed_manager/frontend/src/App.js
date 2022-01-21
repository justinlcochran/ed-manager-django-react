
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
import StudentNav from "./components/StudentNav";
import StudentDash from "./pages/StudentDash";
import RequireStaff from "./components/RequireStaff";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' exact element={<><NavBar /> <TeacherHome /> </>} />
              <Route path='/create' element={<RequireStaff><NavBar /> <TeacherCreate /> </RequireStaff>} />
              <Route path='/create/knowShowChart' element={
                <StandardContextProvider>
                  <NavBar /> <CreateKnowShow />
                </StandardContextProvider>} />
              <Route path='/create/assessment' element={
                <StandardContextProvider>
                  <CreateAssessmentProvider>
                    <NavBar /> <CreateAssessment/>
                  </CreateAssessmentProvider>
                </StandardContextProvider>} />
              <Route path='/viewassessment' element={<><NavBar /> <ViewAssessment /> </>} />
              <Route path='/create/enrollment' element={<><NavBar /> <CreateEnrollment /> </>} />

              <Route path='/student' element={<><StudentNav /><StudentDash /></>} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
