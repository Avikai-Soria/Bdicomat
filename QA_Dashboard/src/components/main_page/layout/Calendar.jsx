import React, { useContext, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formatDate } from "@fullcalendar/core";
import { Paper, Stack } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";

import "../../../style_files/calender.css";

function renderEventContent(eventInfo) {
  eventInfo.timeText = "";
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

// Utility function to format date string and extract date (YYYY-MM-DD) without the time
const formatDateWithoutTime = (dateString) => {
  if (!dateString) {
    return "";
  }

  // Split the date string at 'T' and get the first part (date part)
  const dateParts = dateString.split("T");
  return dateParts[0];
};

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const { userId, apiKey } = useContext(UserInfoContext);

  useEffect(() => {
    // Function to fetch scheduled test data from the backend API
    const fetchScheduledTests = async () => {
      try {
        const response = await apiFetch(`scheduledtests?userId=${userId}`, "GET", apiKey);
        const mappedEvents = response.data.scheduledTests.map((scheduledTest) => ({
          id: scheduledTest.id,
          title: scheduledTest.testName, // Replace with the appropriate title property from your data
          date: formatDateWithoutTime(scheduledTest.scheduledTime), // Replace with the appropriate property for scheduledTime
          allDay: false, // You can adjust this based on whether the event is an all-day event or not
        }));
        setCurrentEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching scheduled tests:", error);
      }
    };

    // Call the fetchScheduledTests function to get the data
    fetchScheduledTests();
  }, []);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    // Leave it for later maybe... need to map all events into currentEvents somehow
  };

  if (!currentEvents)
    return <p>Loading events...</p>

  return (
    <Stack direction={"row"}>
      <Paper className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2 style={{ textAlign: "center" }}>
            All Events ({currentEvents.length})
          </h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </Paper>

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
             eventAdd={function(){}}
             eventChange={function(){}}
             eventRemove={function(){}}
             */
        />
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
      </div>
    </Stack>
  );
};

export default Calendar;
