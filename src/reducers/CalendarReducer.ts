import { CalendarApi } from '@fullcalendar/core';
import { CalendarState } from 'providers/CalendarProvider';
import { CalendarEvent } from 'types/calendar';

export const SET_CALENDAR_STATE = 'SET_CALENDAR_STATE';
export const INITIALIZE_CALENDAR = 'INITIALIZE_CALENDAR';
export const INITIALIZE_SCHEDULER = 'INITIALIZE_SCHEDULER';
export const HANDLE_SELECT = 'HANDLE_SELECT';
export const ADD_NEW_EVENT = 'ADD_NEW_EVENT';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const SELECT_EVENT = 'SELECT_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_TASK = 'UPDATE_TASK';

export type CALENDAR_ACTION_TYPE =
  | { type: typeof SET_CALENDAR_STATE; payload: Partial<CalendarState> }
  | { type: typeof INITIALIZE_CALENDAR; payload: CalendarApi }
  | { type: typeof INITIALIZE_SCHEDULER; payload: CalendarApi }
  | { type: typeof HANDLE_SELECT; payload: { startDate: string; endDate: string } }
  | { type: typeof ADD_NEW_EVENT; payload: CalendarEvent }
  | { type: typeof ADD_NEW_TASK; payload: CalendarEvent }
  | { type: typeof SELECT_EVENT; payload: CalendarEvent }
  | { type: typeof UPDATE_EVENT; payload: CalendarEvent }
  | { type: typeof UPDATE_TASK; payload: CalendarEvent };

const persistCalendar = (events: any[], tasks: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('calendar-data', JSON.stringify({ events, tasks }));
  }
};

export const calendarReducer = (state: CalendarState, action: CALENDAR_ACTION_TYPE) => {
  switch (action.type) {
    case SET_CALENDAR_STATE:
      return { ...state, ...action.payload };

    case INITIALIZE_CALENDAR:
      return { ...state, calendarApi: action.payload };

    case INITIALIZE_SCHEDULER:
      return { ...state, schedulerApi: action.payload };

    case HANDLE_SELECT:
      return {
        ...state,
        openNewEventModal: true,
        selectedStartDate: action.payload.startDate,
        selectedEndDate: action.payload.endDate,
        selectedItem: null,
      };

    case ADD_NEW_EVENT: {
      const events = [...state.events, action.payload];
      persistCalendar(events, state.tasks);
      state.calendarApi?.addEvent(action.payload);
      return { ...state, events, openNewEventModal: false };
    }

    case ADD_NEW_TASK: {
      const tasks = [...state.tasks, action.payload];
      persistCalendar(state.events, tasks);
      state.calendarApi?.addEvent(action.payload);
      return { ...state, tasks, openNewEventModal: false };
    }

    case SELECT_EVENT:
      return { ...state, selectedItem: action.payload, openNewEventModal: true };

    case UPDATE_EVENT: {
      const events = state.events.map((e) => (e.id === action.payload.id ? action.payload : e));
      persistCalendar(events, state.tasks);
      return { ...state, events, openNewEventModal: false };
    }

    case UPDATE_TASK: {
      const tasks = state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t));
      persistCalendar(state.events, tasks);
      return { ...state, tasks, openNewEventModal: false };
    }

    default:
      return state;
  }
};
