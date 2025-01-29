import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { GridDefault } from '../../components/Grid/GridDefault';
import { GridActions } from '../../components/Grid/GridActions';
import { GridFooterActions } from '../../components/Grid/GridFooterActions';
import { taskTypeServices } from '../../services/taskTypeServices';
import MessageNotification from '../../components/Notification/MessageNotification';
import { useGridContext } from '../../context/GridContext';

const TaskTypesContent = () => {
  const { columns } = useGridContext();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [message, setMessage] = useState({
    text: '',
    type: '',
    visible: false
  });

  const fetchData = useCallback(async () => {
    const result = await taskTypeServices.getAll();
    if (result.success) {
      setData(result.data);
      setSelectedRows([]);
    }
  }, []);

  const handleMessage = useCallback((text, type) => {
    setMessage({
      text,
      type: type || 'success',
      visible: true
    });

    setTimeout(() => {
      setMessage({ text: '', type: '', visible: false });
    }, 3000);
  }, []);

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;

    const taskTypeToDelete = data.find(taskType => taskType.id === selectedRows[0]);
    const result = await taskTypeServices.delete(selectedRows[0], taskTypeToDelete.taskName);
    
    handleMessage(result.message, result.success ? 'delete' : 'error');
    
    if (result.success) {
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box m="20px" position="relative">
      {message.visible && (
        <Box mb="20px" display="flex" justifyContent="center" width="100%">
          <MessageNotification 
            message={message.text}
            type={message.type}
            visible={message.visible}
          />
        </Box>
      )}
      
      <GridActions 
        services={taskTypeServices}
        onSuccess={fetchData}
      />
      
      <GridDefault 
        data={data}
        columns={columns}
        onDataChange={fetchData}
        onRowSelect={setSelectedRows}
        onEditSubmit={taskTypeServices.update}
      />
      
      <GridFooterActions 
        services={taskTypeServices}
        selectedRows={selectedRows}
        onSuccess={fetchData}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default TaskTypesContent;