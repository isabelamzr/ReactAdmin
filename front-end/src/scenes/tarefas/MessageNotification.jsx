// MessageNotification.jsx 

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";


const MessageNotification = ({ 
  message, 
  type = 'success', 
  visible = false, 
  
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const backgroundColor = {
    success: theme.palette.mode === "dark" 
      ? colors.greenAccent[700] 
      : colors.greenAccent[400],
    error: theme.palette.mode === "dark" 
      ? colors.redAccent[500]
      : colors.redAccent[500],
    delete: theme.palette.mode === "dark"
      ? colors.redAccent[700]
      : colors.redAccent[500]
  }[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "normal",
            fontSize: "0.8rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "fit-content",
            margin: "0 auto",
            color: theme.palette.mode === "dark" 
              ? colors.grey[100] 
              : colors.grey[900],
            backgroundColor
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageNotification;