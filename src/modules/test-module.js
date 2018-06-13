const TEST_WORKING = 'TEST_WORKING';

const initState = {
  isWorking: true,
};

export const test = (state = initState, action) => {
  switch (action.type) {
    case TEST_WORKING:
      return {
        ...state,
        isWorking: true,
      };
    default:
      return state;
  }
};
