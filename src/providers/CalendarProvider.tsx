'use client';

import { createContext, Dispatch, PropsWithChildren, useReducer, useContext } from 'react';
import { CalendarApi } from '@fullcalendar/core';
import { eventList, taskList } from 'data/calendar';
import {
  CALENDAR_ACTION_TYPE,
  calendarReducer,
  SET_CALENDAR_STATE,
} from 'reducers/CalendarReducer';
import { CalendarEvent, CalendarTask } from 'types/calendar';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

export interface CalendarState {
  calendarApi: CalendarApi | null;
  schedulerApi: CalendarApi | null;
  title: string;
  selectedItem: CalendarEvent | CalendarTask | null;
  view: CalendarView;
  openNewEventModal: boolean;
  selectedStartDate: Date | string;
  selectedEndDate: Date | string;
  events: CalendarEvent[] | [];
  tasks: CalendarTask[] | [];
}

interface CalendarContextInterface extends CalendarState {
  calendarDispatch: Dispatch<CALENDAR_ACTION_TYPE>;
  updateView: (type: 'calendar' | 'scheduler', action: 'prev' | 'next' | 'today') => void;
  navigateToDate: (date: Date) => void;
}

export const CalendarContext = createContext({} as CalendarContextInterface);

const getStoredCalendarData = () => {
  if (typeof window === 'undefined') return { events: eventList, tasks: taskList };
  try {
    const stored = localStorage.getItem('calendar-data');
    if (!stored) return { events: eventList, tasks: taskList };
    return JSON.parse(stored);
  } catch {
    return { events: eventList, tasks: taskList };
  }
};

const CalendarProvider = ({ children }: PropsWithChildren) => {
  const storedData = getStoredCalendarData();

  const initialState: CalendarState = {
    calendarApi: null,
    schedulerApi: null,
    title: '',
    selectedItem: null,
    view: 'timeGridWeek',
    openNewEventModal: false,
    selectedStartDate: '',
    selectedEndDate: '',
    events: storedData.events,
    tasks: storedData.tasks,
  };

  const [calendarState, calendarDispatch] = useReducer(calendarReducer, initialState);

  const updateView = (type: 'calendar' | 'scheduler', action: 'prev' | 'next' | 'today') => {
    const api = type === 'calendar' ? calendarState.calendarApi : calendarState.schedulerApi;
    if (!api) return;
    if (action === 'next') api.next();
    else if (action === 'prev') api.prev();
    else api.today();

    calendarDispatch({
      type: SET_CALENDAR_STATE,
      payload: { title: api.view.title },
    });
  };

  const navigateToDate = (date: Date) => {
    if (calendarState.calendarApi) {
      calendarState.calendarApi.gotoDate(date);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        ...calendarState,
        calendarDispatch,
        updateView,
        navigateToDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarProvider;
