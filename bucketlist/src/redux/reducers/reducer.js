import axios from "axios";

const initialState = {
  user: {},
  countryList: [],
  bucketlist: [],
  visitedList: []
};

const PENDING = "_PENDING";
const FULFILLED = "_FULFILLED";

const ADD_USER = "ADD_USER";
const GET_COUNTRIES = "GET_COUNTRIES";
const ADD_TO_BUCKETLIST = "ADD_TO_BUCKETLIST";
const REMOVE_FROM_BUCKETLIST = "REMOVE_FROM_BUCKETLIST";
const ADD_TO_VISITEDLIST = "ADD_TO_VISITEDLIST";
const REMOVE_FROM_VISITEDLIST = "REMOVE_FROM_VISITEDLIST";
const GET_COUNTRIESBYUSERID = "GET_COUNTRIESBYUSERID";

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case ADD_USER + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case GET_COUNTRIES + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case GET_COUNTRIES + FULFILLED:
      return Object.assign({}, state, { countryList: action.payload });

    case ADD_TO_BUCKETLIST + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case ADD_TO_BUCKETLIST + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        bucketList: action.payload
      });
    case REMOVE_FROM_BUCKETLIST + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case REMOVE_FROM_BUCKETLIST + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        bucketList: action.payload
      });
    case ADD_TO_VISITEDLIST + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case ADD_TO_VISITEDLIST + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        visitedList: action.payload
      });
    case REMOVE_FROM_VISITEDLIST + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case REMOVE_FROM_VISITEDLIST + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        visitedList: action.payload
      });

    case GET_COUNTRIESBYUSERID + PENDING:
      return Object.assign({}, state, { isLoading: true });
    case GET_COUNTRIESBYUSERID + FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        countryList: action.payload
      });
    default:
      return state;
  }
}
//actions creaters
export function getUser() {
  return {
    type: ADD_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}

export function getCountries() {
  return {
    type: GET_COUNTRIES,
    payload: axios.get("/api/countries").then(response => {
      console.log("reducer axios call", response.data);
      return response.data;
    })
  };
}

export function addToBucketlist(countryId, userId) {
  return {
    type: ADD_TO_BUCKETLIST,
    payload: axios
      .post("/api/bucketList", { countryId, userId })
      .then(response => response.data)
  };
}

export function removeFromBucketList(countryId, userId) {
  return {
    type: REMOVE_FROM_BUCKETLIST,
    payload: axios
      .post("/api/bucketList/remove", { countryId, userId })
      .then(response => response.data)
  };
}

export function addToVistedList(countryId, userId) {
  return {
    type: ADD_TO_VISITEDLIST,
    payload: axios
      .post("/api/visited", { countryId, userId })
      .then(response => response.data)
  };
}

export function removeFromVistedList(countryId, userId) {
  console.log("remove fired");
  return {
    type: REMOVE_FROM_VISITEDLIST,
    payload: axios
      .post("/api/visited/remove", { countryId, userId })
      .then(response => response.data)
  };
}

export function getCountriesByUserId(id) {
  return {
    type: GET_COUNTRIESBYUSERID,
    payload: axios.get("/api/countries/" + id).then(response => {
      return response.data;
    })
  };
}

export default reducer;
