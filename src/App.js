import React, { useCallback, useRef, useEffect } from 'react';
import {Button, MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import muiTheme from './Theme/theme.json';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import UserDataSource from './DataSources/UserDataSource';
import './main.scss';

const theme = createMuiTheme(muiTheme);

const viewTypes = {
  timeGridWeek: 'timeGridWeek',
  dayGridMonth: 'dayGridMonth'
}

const App = () => {
  const { timeGridWeek, dayGridMonth } = viewTypes;

  const calendar = useRef();

  const changeViewType = useCallback(() => {
    const calendarApi = calendar.current.getApi();
    calendarApi.changeView(timeGridWeek);
    calendarApi.render();
  }, [timeGridWeek]);

  const handleDateClick = useCallback((d) => {
    console.log(d);
  }, []);
  const handleDragStop = useCallback((d) => {
    console.log(d);
  }, []);

  useEffect(() => {
    UserDataSource.get().then((posts) => {
      console.log(posts);
    });
  }, []);

  return ( 
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained" color="secondary" onClick={changeViewType}>
        Button
      </Button>
      <FullCalendar
        defaultView={dayGridMonth}
        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
        ref={calendar}
        dateClick={handleDateClick}
        select={handleDragStop}
        selectable
        firstDay={1}
      />
    </MuiThemeProvider>
  );
}

export default App;
