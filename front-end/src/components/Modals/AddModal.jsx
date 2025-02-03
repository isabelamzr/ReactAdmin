import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import MessageNotification from '../Notification/MessageNotification';
import { validateEntityType, getEntityDefinition, transform } from '../../utils/entityTypes';
import { getVisibleColumns } from '../../screens/Tasks/columns';
import { arrayCompare } from '../../hooks/useDeepCompare';


const AddModal = memo(({ open, onClose, onSubmit, entityType, columns }) => {

  validateEntityType(entityType);

  const entityDef = getEntityDefinition(entityType);
  const visibleColumns = useMemo(() => 
    getVisibleColumns(entityType, columns),
    [entityType, columns]
  );

  const [message, setMessage] = useState({ text: '', type: '', visible: false });
  const [columnOptions, setColumnOptions] = useState({});

  useEffect(() => {
    if (!open) return; 

    const fetchOptions = async () => {
      const options = {};
      for (const column of visibleColumns) {
        if (column.getOptions) {
          options[column.field] = await column.getOptions();
        }
      }
      setColumnOptions(options);
    };

    fetchOptions();
  }, [open, visibleColumns]);

  const validationSchema = yup.object().shape(
    visibleColumns.reduce((acc, col) => {
      acc[col.field] = entityDef.requiredFields.includes(col.field)
        ? yup.string().required('Este campo é obrigatório')
        : yup.string();
      return acc;
    }, {})
  );

  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    try {
      const transformedData = transform(values, entityType, 'toBackend');
      const result = await onSubmit(transformedData);
      
      setMessage({
        text: result.message,
        type: result.success ? 'success' : 'error',
        visible: true
      });

      if (result.success) {
        setTimeout(onClose, 2000);
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
  }, [onSubmit, onClose, entityType]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Cadastro</DialogTitle>
      
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
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ mt: 2 }}
              >
                {visibleColumns.map((column) => (
                  <Box key={column.field} sx={{ gridColumn: "span 4" }}>
                    {column.type === 'singleSelect' ? (
                      <FormControl
                        fullWidth
                        error={!!touched[column.field] && !!errors[column.field]}
                      >
                        <InputLabel>{column.headerName}</InputLabel>
                        <Select
                          value={values[column.field] || ''}
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
                        value={values[column.field] || ''}
                        name={column.field}
                        error={!!touched[column.field] && !!errors[column.field]}
                        helperText={touched[column.field] && errors[column.field]}
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
}, (prevProps, nextProps) => 
  prevProps.open === nextProps.open &&
  prevProps.entityType === nextProps.entityType &&
  arrayCompare(prevProps.columns, nextProps.columns)
);

export default AddModal;