import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx"
import Dashboard from "./scenes/dashboard";
import Users from './scenes/users/index.jsx';
import Tarefas from "./scenes/tarefas/index.jsx";

// import Voluntarios from "./scenes/voluntarios";
// import Coordenadores from "./scenes/coordenadores";
// import Vagas from "./scenes/vagas";
// import FormVagas from "./scenes/formvagas";
// import FormVoluntarios from "./scenes/formvoluntarios";
// import FormCoodernadores from "./scenes/formcoodernadores";
// import Calendar from "./scenes/calendar"
// import DoaçoesChart from "./scenes/doaçoeschart";
// import TarefasChart from "./scenes/tarefaschart";


function App() {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
  <div className="app">
    <Sidebar />
  <main className="content">
    <Topbar />  

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tarefas" element={<Tarefas />} />  


      {/* <Route path="/voluntarios" element={<Voluntarios />} /> */}
      {/* <Route path="/coordenadores" element={<Coordenadores />} /> */}
      {/* <Route path="/vagas" element={<Vagas />} /> */}
      {/* <Route path="/formVagas" element={<FormVagas />} /> */}
      {/* <Route path="/formVoluntarios" element={<FormVoluntarios />} /> */}
      {/* <Route path="/formCoodernadores" element={<FormCoodernadores />} /> */}
      {/* <Route path="/doaçoesChart" element={<DoaçoesChart />} /> */}
      {/* <Route path="/tarefasChart" element={<TarefasChart />} /> */}
      {/* <Route path="/calendar" element={<Calendar />} /> */}
    </Routes>

  </main>  
  </div>
  </ThemeProvider>
  </ColorModeContext.Provider>
  );

}

export default App;
