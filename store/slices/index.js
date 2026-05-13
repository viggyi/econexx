// redux/reducer/index.js
import { combineReducers } from 'redux';

import authReducer from './authSlice'
import globalReducer from './globalSlice';
import companyReducer from './companySlice';
import homeReducer from "./homeSlice";
import unlistedShareReducer from "./unlistedShareSlice";
import preIpoShareReducer from "./preIpoSlice";
import blogReducer from "./blogSlice";
import partnerReducer from "./partnerSlice";
import testimonialReducer from "./testimonialSlice";
// import contactReducer from "./contactSlice";


const appReducer = combineReducers({
  home: homeReducer,
  unlistedShares: unlistedShareReducer,
  preIpoShares: preIpoShareReducer,
  global: globalReducer,
  company: companyReducer,
  auth: authReducer,
  blog: blogReducer,
  partner: partnerReducer,
  testimonials: testimonialReducer,
  // contact: contactReducer,
  // services: servicesReducer,

});

const removeState = (state) => {
  const newState = {};
  Object.entries(state || {}).forEach(([key, value]) => {
    if (['user', 'global'].includes(key)) {
      newState[key] = value;
    }
  });
  return newState;
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_LOGIN_DATA') {
    return appReducer(undefined, action);
  }

  if (action.type === 'RESET_STATE') {
    const newState = removeState(state);
    return appReducer(newState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
