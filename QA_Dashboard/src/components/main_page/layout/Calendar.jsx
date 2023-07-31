import React, { useContext, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formatDate } from "@fullcalendar/core";
import { Paper, Stack } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import { INITIAL_EVENTS } from "./event-utils";

import "../../../style_files/calender.css";

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

let eventGuid = 0;

function createEventId() {
  return String(eventGuid++);
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function adaptData(originalData) {
  const transformedData = [];
  const todayStr = getTodayStr();

  for (const item of originalData) {
    transformedData.push({
      id: createEventId(),
      title: item.testName,
      start: item.scheduledTime, // Use today's date in "YYYY-MM-DD" format
    });
  }
  return transformedData;
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
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
  const [initEvents, setInitEvents] = useState([]);

  const { userId, apiKey } = useContext(UserInfoContext);

  useEffect(() => {
    if (initEvents.length === 0) {
      apiFetch(`scheduledtests?userId=${userId}`, "GET", apiKey)
        .then((response) => {
          setInitEvents(response.data.scheduledTests);
        })
        .catch((err) => console.log("Couldn't load domain's stats..."));
    }
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
      let id = createEventId();
      calendarApi.addEvent({
        id: id,
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
    setCurrentEvents(events);
  };

  if (!currentEvents) return <p>Loading events...</p>;
  if (!initEvents) return <p>Loading events...</p>;
  if (initEvents.length === 0) return <p>No events to show...</p>;

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
        {console.log(adaptData(initEvents), "adaptData(initEvents)")}
        {console.log(INITIAL_EVENTS, "INITIAL_EVENTS")}
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
          initialEvents={adaptData(initEvents)} // alternatively, use the `events` setting to fetch from a feed
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
