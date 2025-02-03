import React, { useState, useCallback, useMemo, memo } from 'react';
import { Box } from '@mui/material';
import { GridDefault } from '../../components/Grid/GridDefault';
import { GridActions } from '../../components/Grid/GridActions';
import { GridFooterActions } from '../../components/Grid/GridFooterActions';
import { taskServices } from '../../services/taskServices';
import MessageNotification from '../../components/Notification/MessageNotification';
import { useGridContext } from '../../hooks/useGridContext';
import { useTaskOptions } from '../../hooks/useOptions/useTaskOptions';

const TasksContent = () => {
  const { rawTaskData: data, taskOptions } = useTaskOptions();
  const { columns } = useGridContext();
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [message, setMessage] = useState({
    text: '',
    type: '',
    visible: false
  });

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

  const handleDelete = useCallback(async () => {
    if (selectedRows.length === 0) return;
    const taskToDelete = data.find(task => task.id === selectedRows[0]);
    if (!taskToDelete) return;
    const result = await taskServices.delete(selectedRows[0], taskToDelete.taskName);
    handleMessage(result.message, result.success ? 'delete' : 'error');
    if (result.success) {
      setSelectedRows([]);
    }
  }, [selectedRows, data, handleMessage]);

  const memoizedMessageNotification = useMemo(() => (
    message.visible && (
      <Box mb="20px" display="flex" justifyContent="center" width="100%">
        <MessageNotification
          message={message.text}
          type={message.type}
          visible={message.visible}
        />
      </Box>
    )
  ), [message]);

  return (
    <Box m="20px" position="relative">
      {memoizedMessageNotification}
      
      <GridActions
        services={taskServices}
        entityType="task"
        options={taskOptions}
      />
      
      <GridDefault
        data={data}
        columns={columns}
        onRowSelect={setSelectedRows}
        onEditSubmit={taskServices.update}
      />
      
      <GridFooterActions
        services={taskServices}
        selectedRows={selectedRows}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default memo(TasksContent);