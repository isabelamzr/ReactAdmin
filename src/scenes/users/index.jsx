import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" }, 

        { field: "name", 
          headerName: "Nome",
          flex: 1,
          cellClassName: "name-column--cell",
        },

        { field: "age", 
            headerName: "Idade",
            type: "number",
            headerAlign: "left",
            align: "left",
          },

          { field: "phone", 
            headerName: "Telefone",
            flex: 1,
           
          },

          { field: "email", 
            headerName: "E-mail",
            flex: 1,
           
          },

          { field: "access", 
            headerName: "Nível de acesso",
            flex: 1,
            renderCell: ({ row}) => {
                const access = row.access;
                return (
                    <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor = {
                     access === "admin"
                        ? colors.greenAccent[600]
                        : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                    >
                    {/* container mostrando diferentes icones dependendo do nivel de acesso */}

                    {access === "admin" && <AdminPanelSettingsOutlinedIcon /> }
                    {access === "manager" && <SecurityOutlinedIcon /> }
                    {access === "user" && <LockOpenOutlinedIcon /> }

                    {/* tem 3 niveis de acesso ai, tem que colocar funcionalidade aqui, 
                    se nao mudo pra 2 e pesquiso como faz pra 1 login só visualizar, buscar, 
                    e outro login poder apagar, adicionar etc */}

                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {access}
                    </Typography>

                    </Box>
                )
            }
           
          },
    ];

    return (
        <Box>
            <Header title="Usuários" subtitle="Configuração de acesso dos usuários" />
            <Box>
                <DataGrid 
                rows={mockDataUsers}
                columns={columns}
                />
            </Box>
        </Box>
    )

}

export default Users;