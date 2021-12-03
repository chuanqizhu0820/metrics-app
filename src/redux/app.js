export const loadHome = (payload) => ({
  type: 'LOAD_HOME', payload,
});

const homeReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_HOME':
      return [...state, action.payload.home.dates];
    default:
      return state;
  }
};

export default homeReducer;
