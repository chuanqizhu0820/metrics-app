export const loadDetails = (payload) => ({
  type: 'LOAD_DETAILS', payload,
});

const detailReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DETAILS':  
      return [...state, action.payload];
    default:
      return state;
  }
};

export default detailReducer;