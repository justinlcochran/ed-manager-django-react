
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
import Assign from "./pages/Assign";
import EnrollmentDash from "./pages/EnrollmentDash";
import TakeAssessment from "./pages/TakeAssessment";
import PlanWeek from "./components/PlanWeek";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' exact element={<RequireStaff>
                                              <StandardContextProvider>
                                                <CreateAssessmentProvider>
                                                  <NavBar />
                                                  <TeacherHome />
                                                </CreateAssessmentProvider>
                                              </StandardContextProvider>
                                            </RequireStaff>} />
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
              <Route path='/assign' element={<Assign />} />
              <Route path='/viewassessment/:assessmentId' element={<><NavBar /> <ViewAssessment /> </>} />
              <Route path='/create/enrollment' element={<><NavBar /> <CreateEnrollment /> </>} />
              <Route path='/enrollmentdash/:enrollmentId' element={<><NavBar /> <EnrollmentDash /> </>} />
              <Route path='/student' element={<><StudentNav /><StudentDash /></>} />
              <Route path='/takeassessment/:dataEntryId' element={<><StudentNav /><TakeAssessment /></>} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
