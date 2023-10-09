import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TONGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  GET_JOB_ERROR,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  SHOW_STATS_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./action.js";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
      break;
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertType: "", alertText: "" };
      break;
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Created! Redirecting...",
      };
      break;
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertType: action.payload.msg,
      };
      break;
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successful!!!Redirecting....",
      };
      break;
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertType: action.payload.msg,
      };
      break;
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
      break;
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertType: action.payload.msg,
      };
      break;
    case TONGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
      break;
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        jobLocation: null,
        userLocation: null,
      };
      break;
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Update User Success!!!!",
      };
      break;
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertType: action.payload.msg,
      };
      break;
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
      break;
    case CLEAR_VALUES:
      const initialState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobType: "full-time",
        status: "pending",
        jobLocation: state.userLocation,
      };
      return {
        ...state,
        ...initialState,
      };
      break;
    case CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Created!!!",
      };
      break;
    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertType: action.payload.msg,
      };
      break;
    case GET_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJob,
        numOfPages: action.payload.numOfPages,
      };
      break;
    case SET_EDIT_JOB:
      const jobs = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobtype, status } = jobs;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobtype,
        status,
      };
      break;
    case DELETE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case EDIT_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job Updated!!",
      };
      break;
    case EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
      break;
    case SHOW_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
      break;
    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplication: action.payload.monthlyApplication,
      };
      break;
    case SHOW_STATS_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
      break;
    case CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
      break;
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
      break;
  }
};
export default reducer;
