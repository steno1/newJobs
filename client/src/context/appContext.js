import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_FILTER,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT_JOB,
  SHOW_STAT_BEGIN,
  SHOW_STAT_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS
} from "./actions";
import React, { createContext, useContext, useReducer } from "react";

import axios from "axios";
import reducer from "./reducer";

// Retrieve user-related values from localStorage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

// Define the initial state for the application
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  isEditing: false,
  editingJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["Full-time", "Part-time", "Remote", "Internship"],
  jobType: "Full-time",
  showSideBar: false,
  statusOptions: ["Interview", "Declined", "Pending"],
  status: "Pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"]
};

// Create the AppContext
const AppContext = createContext();

// Create the AppProvider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create an instance of axios for API requests
  const axiosInstance = axios.create({
    baseURL: "/api/v1",
  });

  // Add request interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logOutUser();
      }
      return Promise.reject(error);
    }
  );

  // Action: Display an alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // Action: Clear an alert after a certain time
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // Action: Add user details to localStorage
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  // Action: Remove user details from localStorage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  // Action: Set up user (login or register)
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axiosInstance.post(`/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText
        }
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      });
    }

    clearAlert();
  };

  // Action: Toggle the sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // Action: Log out the user
  const logOutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  // Action: Update user details
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await axiosInstance.patch("/auth/update", currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token }
      });

      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        });
      }
    }

    clearAlert();
  };

  // Action: Handle form input change
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  // Action: Clear form input values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // Action: Create a new job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await axiosInstance.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {
          msg: error.response.data.message
        }
      });
    }
  };

  // Action: Get jobs
  const getJob = async () => {
    const { search, searchStatus, searchType, sort, page } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOB_BEGIN });

    try {
      const { data } = await axiosInstance.get(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages
        }
      });
    } catch (error) {
      logOutUser();
    }

    clearAlert();
  };

  // Action: Set the job to edit mode
  const setEditJob = (id)=> {
    dispatch({
      type: SET_EDIT_JOB,
      payload: {
        id
      }
    });
  };

  // Action: Edit a job
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await axiosInstance.patch(`/jobs/${state.editingJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status
      });

      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: EDIT_JOB_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      });
    }

    clearAlert();
  };

  // Action: Delete a job
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });

    try {
      await axiosInstance.delete(`/jobs/${jobId}`);
      getJob();
    } catch (error) {
      logOutUser();
    }
  };

  // Action: Show job statistics
  const showStats = async () => {
    dispatch({ type: SHOW_STAT_BEGIN });

    try {
      const { data } = await axiosInstance(`/stats`);

      dispatch({
        type: SHOW_STAT_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      });
    } catch (error) {
      logOutUser();
    }

    clearAlert();
  };

  // Action: Clear search filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Action: Change the current page
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  // Provide the state and actions to the consuming components
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logOutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJob,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
