import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import { taskServices } from '../../services/taskServices';
import MessageNotification from '../Notification/MessageNotification'

const EditModal = ({ open, onClose, data, columns, onSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [columnOptions, setColumnOptions] = useState({});
  const [message, setMessage] = useState({ text: '', type: '', visible: false });

  useEffect(() => {
    const fetchOptions = async () => {
      const options = {};
      for (let column of columns) {
        if (column.getOptions) {
          options[column.field] = await column.getOptions();
        }
      }
      setColumnOptions(options);
    };
    fetchOptions();
  }, [columns]);

  const validationSchema = yup.object().shape(
    columns.reduce((schema, column) => {
      if (column.validation) {
        schema[column.field] = column.validation;
      }
      return schema;
    }, {})
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await taskServices.update(data.id, values);
      
      setMessage({
        text: result.message, 
        type: result.success ? 'success' : 'error', 
        visible: true
      });
      
      if (result.success) {
        setTimeout(() => {
          onSuccess(result.message, result.success ? 'success' : 'error');
          onClose();
        }, 2000);
      }
    } catch (error) {
      setMessage({
        text: error.message, 
        type: 'error', 
        visible: true
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Cadastro</DialogTitle>

      {message.visible && (
        <Box p={2}>
          <MessageNotification 
            message={message.text}
            type={message.type}
            visible={message.visible}
          />
        </Box>
      )}
    
      <DialogContent>
        <Formik
          onSubmit={handleSubmit}
          initialValues={data}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ mt: 2 }}>
                {columns.map((column) => (
                  <Box key={column.field} sx={{ gridColumn: "span 4" }}>
                    {column.type === 'singleSelect' ? (
                      <FormControl 
                        fullWidth 
                        error={!!touched[column.field] && !!errors[column.field]}
                        sx={{
                          '& .MuiInputLabel-root': { 
                            color: colors.grey[100] 
                          },
                          '& .MuiSelect-icon': { 
                            color: colors.grey[100] 
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: colors.greenAccent[400],
                            },
                            '&:hover fieldset': {
                              borderColor: colors.greenAccent[300],
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: colors.greenAccent[500],
                            },
                          }
                        }}
                      >
                        <InputLabel>{column.headerName}</InputLabel>
                        <Select
                          value={values[column.field]}
                          label={column.headerName}
                          onChange={(e) => setFieldValue(column.field, e.target.value)}
                        >
                          {(columnOptions[column.field] || []).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        label={column.headerName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[column.field]}
                        name={column.field}
                        error={!!touched[column.field] && !!errors[column.field]}
                        helperText={touched[column.field] && errors[column.field]}
                        sx={{
                          '& .MuiInputLabel-root': { 
                            color: colors.grey[100] 
                          },
                          '& .MuiFilledInput-root': {
                            backgroundColor: colors.primary[500],
                            '&:hover': {
                              backgroundColor: colors.primary[400],
                            },
                            '&.Mui-focused': {
                              backgroundColor: colors.primary[400],
                            }
                          }
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
              <DialogActions sx={{ mt: 3 }}>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  color="primary" 
                  variant="contained" 
                  disabled={isSubmitting}
                >
                  Salvar
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export { EditModal };