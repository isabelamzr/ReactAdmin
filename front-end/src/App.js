import { Suspense, lazy } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider, CircularProgress } from "@mui/material";
import { Routes, Route, useLocation } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';

import Topbar from './global/Topbar';
import Sidebar from './global/Sidebar';

const Tasks = lazy(() => import('./screens/Tasks'));
const Volunteers = lazy(() => import('./screens/Volunteers'));
const Coordinators = lazy(() => import('./screens/Coordinators'));
const TaskTypes = lazy(() => import('./screens/TasksTypes'));
const Units = lazy(() => import('./screens/Units'));
const Spots = lazy(() => import('./screens/Spots'));
const Skills = lazy(() => import('./screens/Skills'));
const SpotStatus = lazy(() => import('./screens/SpotStatus'));
const Dashboard = lazy(() => import('./screens/Dashboard'));
const Users = lazy(() => import('./screens/Users'));
const Calendar = lazy(() => import('./screens/Calendar'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const pageInfo = {
    '/': { title: 'Olá, você é bem-vindo!', subtitle: 'Admin Dashboard Page' },
    '/users': { title: 'Usuários', subtitle: 'Gerenciamento de usuários' },
    '/tasks': { title: 'Tarefas', subtitle: 'Gerenciador de tarefas' },
    '/volunteers': { title: 'Voluntários', subtitle: 'Gerenciamento de Voluntários' },
    '/coordinators': { title: 'Coordenadores', subtitle: 'Gerenciamento de Coordenadores Ativos' },
    '/tasksTypes': { title: 'Tipos de Tarefa', subtitle: 'Gerenciamento de tipo tarefas' },
    '/units': { title: 'Unidades', subtitle: 'Gerencie as unidades das associações' },
    '/spots': { title: 'Vagas', subtitle: 'Gerenciamento de Vagas Ativas' },
    '/skills': { title: 'Habilidades', subtitle: 'Gerenciamento de habilidades' },
    '/spotStatus': { title: 'Status de Vagas', subtitle: 'Gerenciamento de vagas' },
    '/calendar': { title: 'Calendário', subtitle: 'Agende e organize as atividades' },
  };
  const currentPageInfo = pageInfo[location.pathname] || { title: 'Página', subtitle: '' };

  return (
  <NavigationProvider>
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar 
            pageTitle={currentPageInfo.title} 
            pageSubtitle={currentPageInfo.subtitle} 
          /> 
          <Suspense fallback={<LoadingFallback />}> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tasks" element={<Tasks />} /> 
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/coordinators" element={<Coordinators />} /> 
            <Route path="/tasksTypes" element={<TaskTypes />} /> 
            <Route path="/units" element={<Units />} /> 
            <Route path="/spots" element={<Spots />} />  
            <Route path="/skills" element={<Skills />} /> 
            <Route path="/spotStatus" element={<SpotStatus />} /> 
            <Route path="/calendar" element={<Calendar />} />            
          </Routes>
          </Suspense>
        </main>  
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
 </NavigationProvider>
  );
}

export default App;