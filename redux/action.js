export const SAVE = 'SAVE';
export const GET = 'GET';

let scenarioId = 0;

export const saveScenarios = scenarios => ({
  type: SAVE,
  payload: {
    scenarios,
  },
});
