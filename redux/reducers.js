import {SAVE} from './action';

const scenarios = [];

const scenariosReducer = (state = scenarios, action) => {
  switch (action.type) {
    case SAVE: {
      const {scenarios} = action.payload;
      //console.log(action.payload);
      return {
        ...state,
        scenarios: scenarios,
      };
    }
    default:
      return state;
  }
};

export default scenariosReducer;
