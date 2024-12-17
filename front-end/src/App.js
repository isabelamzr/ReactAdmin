import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx"
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users/index.jsx";
import Tarefas from "./scenes/tarefas/index.jsx";
import Voluntarios from "./scenes/voluntarios";
import Coordenadores from "./scenes/coordenadores";
import Vagas from "./scenes/vagas";
import FormVagas from "./scenes/formVagas";
import FormVoluntarios from "./scenes/formVoluntarios";
import FormCoordenadores from "./scenes/formCoordenadores/index.jsx";
import Calendar from "./scenes/calendar"
import Habilidades from "./scenes/habilidades/index.jsx"
import StatusVagas from "./scenes/statusVagas/index.jsx"
import TipoTarefa from "./scenes/tiposTarefas/index.jsx"
import Unidade from "./scenes/unidades/index.jsx"

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const pageInfo = {
    '/': { title: 'Olá, você é bem-vindo!', subtitle: 'Admin Dashboard Page' },
    '/users': { title: 'Usuários', subtitle: 'Gerenciamento de usuários' },
    '/tarefas': { title: 'Tarefas', subtitle: 'Gerenciador de tarefas' },
    '/voluntarios': { title: 'Voluntários', subtitle: 'Gerenciamento de Voluntários' },
    '/coordenadores': { title: 'Coordenadores', subtitle: 'Gerenciamento de Coordenadores Ativos' },
    '/vagas': { title: 'Vagas', subtitle: 'Gerenciamento de Vagas Ativas' },
    '/formVagas': { title: 'Formulário de Vagas', subtitle: 'Cadastrar nova vaga' },
    '/formVoluntarios': { title: 'Formulário de Voluntários', subtitle: 'Cadastrar novo voluntário' },
    '/formCoordenadores': { title: 'Formulário de Coordenadores', subtitle: 'Cadastrar novo coordenador' },
    '/calendar': { title: 'Calendário', subtitle: 'Agende e organize as atividades' },
    '/habilidades': { title: 'Habilidades', subtitle: 'Gerenciamento de habilidades' },
    '/statusVagas': { title: 'Status de Vagas', subtitle: 'Gerenciamento de vagas' },
    '/tipoTarefa': { title: 'Tipos de Tarefa', subtitle: 'Gerenciamento de tipo tarefas' },
    '/unidade': { title: 'Unidades', subtitle: 'Gerencie as unidades das associações' }
  };

  const currentPageInfo = pageInfo[location.pathname] || { title: 'Página', subtitle: '' };

  return (
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tarefas" element={<Tarefas />} />  
            <Route path="/voluntarios" element={<Voluntarios />} />
            <Route path="/coordenadores" element={<Coordenadores />} /> 
            <Route path="/vagas" element={<Vagas />} /> 
            <Route path="/formVagas" element={<FormVagas />} /> 
            <Route path="/formVoluntarios" element={<FormVoluntarios />} />
            <Route path="/formCoordenadores" element={<FormCoordenadores />} />
            <Route path="/calendar" element={<Calendar />} /> 
            <Route path="/habilidades" element={<Habilidades />} /> 
            <Route path="/statusVagas" element={<StatusVagas />} /> 
            <Route path="/tipoTarefa" element={<TipoTarefa />} /> 
            <Route path="/unidade" element={<Unidade />} /> 
          </Routes>
        </main>  
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;