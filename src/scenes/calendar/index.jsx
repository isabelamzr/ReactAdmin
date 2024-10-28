import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Carregar eventos do Local Storage ao inicializar
  const [currentEvents, setCurrentEvents] = useState(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Salvar eventos no Local Storage sempre que houver alterações em currentEvents
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    const title = prompt("Por favor, insira um título para o seu evento");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      calendarApi.addEvent(newEvent); // Adiciona o evento ao calendário
      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]); // Atualiza o estado com o novo evento
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Tem certeza que deseja remover o evento? '${selected.event.title}'`)) {
      const eventId = selected.event.id;
      selected.event.remove(); // Remove o evento do calendário
      setCurrentEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId)); // Atualiza o estado excluindo o evento
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Calendário"
        subtitle="Agende e organize as atividades dos voluntários"
      />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Atividades</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        locale: "pt-BR",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            locales={[ptBrLocale]} // Adiciona o idioma português do Brasil
            locale="pt-BR" // Define como o idioma ativo
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} // Usa o estado currentEvents para carregar eventos
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
