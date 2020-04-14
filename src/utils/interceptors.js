import axios from 'axios';

const baseUrl = "http://localhost:3005/";
const token = { 'x-token': localStorage.token }

export function postApi(url, obj, headers = token) {
  return axios.post(baseUrl + url, obj, { headers })
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export function getApi(url, headers = token) {

  return axios.get(baseUrl + url, { headers })
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export function putApi(url, obj) {
  return axios.put(baseUrl + url, obj)
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export function deleteApi(url) {
  return axios.delete(baseUrl + url)
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export function handleError(error) {
  const { response } = error;
  if (response && response.data) {
    throw response.data;
  }
  throw error;
};