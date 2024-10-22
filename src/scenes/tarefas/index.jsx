import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { tokens } from "../../theme";
import { mockDataTarefas } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


const Tarefas = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, 

        { field: "nome", headerName: "Nome", flex: 1, cellClassName: "name-column--cell", },
        
        { field: "email", headerName: "E-mail", flex: 1, }, 

        { field: "endereço", headerName: "Endereço", flex: 1 }, 

        { field: "telefone", headerName: "Telefone", flex: 1, }, 

        { field: "habilidades", headerName: "Habilidades", flex: 1, }, 

        { field: "tarefa", headerName: "Tarefa", flex:1, }, 

        { field: "unidade", headerName: "Unidade", flex:1, }, 

        { field: "termoAssinado", headerName: "Termo-Assinado", flex: 1, }, 

        { field: "candidatando", headerName: "Candidatando", flex: 1, }, 

        { field: "createdBy", headerName: "Created By", flex: 1, }, 

        { field: "dataCriação", headerName: "Data Criação", flex: 1, }, 

        { field: "obs", headerName: "Observações", flex: 1, }, 

        { field: "controleVagas", headerName: "Controle Vagas", flex: 1, }, 
        
        ];

        const customLocaleText = {
            ...ptBR.components.MuiDataGrid.defaultProps.localeText, 
            filterOperatorDoesNotContain: 'não contém', 
            filterOperatorDoesNotEqual: 'não é igual', 
            filterOperatorEquals: 'igual a', 
          };
        
        return (
        <Box m="20px">
          <Header title="Tarefas" subtitle="Gerenciador de tarefas" />
          <Box
            m="40px 0 0 0" 
            height="75vh" 
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .custom-header": {
                backgroundColor: colors.blueAccent[700], 
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700], 
                borderBottom: "none",
              },

              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              
              "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
                color: `${colors.grey[100]} !important`
              },
            
            }}
          >
        
        <DataGrid
        rows={mockDataTarefas}
        columns={columns}
        localeText={customLocaleText}
        slots={{ toolbar: GridToolbar }}/>
        </Box>
        </Box>
        
)}

export default Tarefas;