import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  CLEAR_ERRORS,
  DELETE_PROJECT
} from "./types";

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post("/api/project", project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjects = () => async dispatch => {
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
    dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const deleteProject = id => async dispatch => {
  if (
    window.confirm("Are you sure you want to delete the `" + id + "` project?")
  ) {
    try {
      await axios.delete(`/api/project/${id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      });
    } catch (err) {
      alert(err.message);
    }
  }
};
