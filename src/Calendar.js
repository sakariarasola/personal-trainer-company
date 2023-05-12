import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        const transformedEvents = data.map(training => ({
          start: moment(training.date).toDate(),
          end: moment(training.date).add(training.duration, 'minutes').toDate(),
          title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
        }));
        setEvents(transformedEvents);
      })
      .catch(error => console.error(error));
  };

  return (
    <div style={{ height: '500px' }}>
      <BigCalendar localizer={localizer} events={events} views={['month', 'week', 'day']} />
    </div>
  );
};

export default Calendar;