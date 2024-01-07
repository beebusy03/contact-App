import { createStore, combineReducers } from 'redux';

// Action types
const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';


// Initial state for contacts
const initialState = {
  contacts: [],
};

// Reducer for contact actions
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      // Find the index of the contact in the array
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);

      // Create a new array with the updated contact
      const updatedContacts = [...state.contacts];
      updatedContacts[index] = action.payload;

      return {
        ...state,
        contacts: updatedContacts,
      };
    
      case REMOVE_CONTACT:
        // Filter out the contact with the specified id
        const filteredContacts = state.contacts.filter((c) => c.id !== action.payload.id);
  
        return {
          ...state,
          contacts: filteredContacts,
        };
      
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  contacts: contactReducer,
  
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;