import { ColorModeContext, useMode } from './theme';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from 'react-router-dom';

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
import TipoTarefa from "./scenes/tipoTarefa/index.jsx"
import Unidade from "./scenes/unidade/index.jsx"


// import DoaçoesChart from "./scenes/doaçoeschart";



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

      {/* <Route path="/doaçoesChart" element={<DoaçoesChart />} /> */}
      {/* <Route path="/tarefasChart" element={<TarefasChart />} /> */}
   

    </Routes>

  </main>  
  </div>

  </ThemeProvider>
  </ColorModeContext.Provider>

  );
}

export default App;
