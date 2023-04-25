export const getError = (error) => {
  return error.response && error.response.data.error.message
    ? error.response.data.error.message
    : error.response;
};