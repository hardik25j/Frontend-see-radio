import axios from 'axios';

const baseUrl = "http://localhost:3005/";

export const postApi = (url, obj) => {
  return axios.post(baseUrl + url, obj)
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export const getApi = (url) => {
  const headers={'x-token':localStorage.token}
  return axios.get(baseUrl + url,{headers})
    .then(response => {
      console.log("respone",response.data);
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export const putApi = (url, obj) => {
  return axios.put(baseUrl + url, obj)
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export const deleteApi = (url) => {
  return axios.delete(baseUrl + url)
    .then(response => {
      return response.data;
    }).catch((error) => {
      return handleError(error);
    });
}

export const handleError = error => {
  const { response } = error;
  if (response && response.data) {
    throw response.data;
  } 
  //mangae error code like 400, 401 as per your requirement 
  throw error;
};