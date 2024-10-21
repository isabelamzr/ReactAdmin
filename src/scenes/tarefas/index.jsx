import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockData } from "../../data/mockData";
import Header from "../../components/Header";


const Tarefas = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" }, 

        { field: "nome", headerName: "Nome", flex: 1, cellClassName: "name-column--cell", },
        
        { field: "email", headerName: "E-mail" }, 

        { field: "endereço", headerName: "Endereço" }, 

        { field: "telefone", headerName: "Telefone" }, 

        { field: "habilidades", headerName: "Habilidades" }, 

        { field: "tarefa", headerName: "Tarefa" }, 

        { field: "unidade", headerName: "Unidade" }, 

        { field: "termoAssinado", headerName: "Termo-Assinado", type: "boolean", }, 

        { field: "candidatando", headerName: "Candidatando" }, 

        { field: "createdBy", headerName: "Created By" }, 
        
        { field: "dataCriação", headerName: "Data Criação" }, 
        { field: "obs", headerName: "Observações" }, 
        { field: "controleVagas", headerName: "Controle Vagas" }, 
    ]


    return (
        <Box>
            <Header title="TAREFAS" subtitle="Gerenciador de tarefas" />
            <Box>
                <DataGrid rows={mockData} columns={columns} />
            </Box>
        </Box>
    )
}

export default Tarefas;