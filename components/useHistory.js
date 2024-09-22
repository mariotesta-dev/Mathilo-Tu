import {useState} from 'react';

/* Undo and redo */

/* We use an index to say in which state we are in:
- When we undo, we step back
- When we redo, we step forward
Indeed we always return history[index]
*/
export const useHistory = initialState => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);
  // setState is setSelectedObjects, which takes in a function
  const setState = (action, avoid = false) => {
    // Action can be:
    // - a function, for example: setSelectedObjects(prevState => [...prevState, object])
    // - directly the new state, for example: setSelectedObjects(obj) (not the case for our selectedObjects)
    const newState =
      typeof action === 'function' ? action(history[index]) : action;
    if (avoid) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      // When I write new history (for example undo and then insert a new object)
      // I need to whiten the content after the index
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex(prevState => prevState + 1); // We have done an action, so we increment the index
    }
  };
  const undo = () => index > 0 && setIndex(prevState => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex(prevState => prevState + 1);
  return [history[index], setState, undo, redo];
};
