import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
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
  CHANGE_PAGE,
  CLEAR_FILTERS,
} from "./action.js";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

//  Init Inittial State

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplication: [],
  searchStattus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
// Create Context

const AppContext = React.createContext();

// Create Provider

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Axios

  const authFetch = axios.create({
    baseURL: "/auth/v1/api",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  //  Function Dispatch Alert

  const dispatchAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // Function Clear Alert

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // Add data in to localStore
  const addDataToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  // Remove User from Local Storage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };
  // Function Register User

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/auth/v1/api/register", currentUser);
      console.log(response);
      const { user, location } = response.data;
      const token = response.data.token;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // Login User
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/auth/v1/api/login", currentUser);

      const { user, location } = data;
      const token = data.token;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/auth/v1/api/${endpoint}`,
        currentUser
      );

      const { user, location } = data;
      const token = data.token;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  // Tonggle Sidebar Function
  const tonggleSidebar = () => {
    dispatch({ type: TONGGLE_SIDEBAR });
  };
  //
  const logOutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/updateUser", currentUser, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const { user, location, token } = data;
      console.log(data);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addDataToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status, token } = state;
      authFetch.post("/jobs/create", {
        position,
        company,
        jobLocation,
        jobType,
        status,
        token,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return dispatch({
          type: CREATE_JOB_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
    clearAlert();
  };
  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `jobs/get?page=${page}&`;
    if (searchStatus && searchStatus !== "all") {
      url = url + `status=${searchStatus}&`;
    }
    if (searchType && searchType !== "all") {
      url = url + `jobType=${searchType}&`;
    }
    if (sort) {
      url = url + `sort=${sort}&`;
    }
    if (search) {
      url = url + `&search=${search}&`;
    }
    dispatch({
      type: GET_JOB_BEGIN,
    });
    try {
      const { data } = await authFetch(url);

      const { jobs, totalJob, numOfPages } = data;
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: { jobs, totalJob, numOfPages },
      });
    } catch (error) {
      logOutUser();
    }
    clearAlert();
  };
  const setEditJob = async (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CLEAR_ALERT });
      dispatch({ type: EDIT_JOB_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: EDIT_JOB_ERROR,
          payload: { msg: error.response.data },
        });
      }
      console.log(error.response);
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({
      type: DELETE_JOB_BEGIN,
    });
    try {
      await authFetch.delete(`/jobs/delete/${jobId}`);
      getJobs();
    } catch (error) {
      logOutUser();
    }
  };
  //Show stats
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/jobs/stats");

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultValue,
          monthlyApplication: data.montlyApplications,
        },
      });
    } catch (error) {
      console.log(error.response);
      logOutUser();
    }
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  // Export data from Pareent Component to Children Component

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatchAlert,
        registerUser,
        loginUser,
        setupUser,
        tonggleSidebar,
        logOutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        deleteJob,
        setEditJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
