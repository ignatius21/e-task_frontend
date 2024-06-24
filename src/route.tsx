import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailView from './views/projects/ProjectDetailView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCode from './views/auth/RequestNewCode'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView/>} index/>
                    <Route path="/projects/create" element={<CreateProjectView/>}/>
                    <Route path="/projects/:projectId" element={<ProjectDetailView/>}/>
                    <Route path="/project/:projectId/edit" element={<EditProjectView/>}/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>}/>
                    <Route path="/auth/request-code" element={<RequestNewCode/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}