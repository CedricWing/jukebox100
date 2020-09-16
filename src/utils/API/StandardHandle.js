const standardHandle = (response, successCallback, failureCallback) => {
  if (response.status === 200) {
    console.log("Success callback on : " + response.url);
    successCallback();
  }
  //Add more custom http status response below
  else {
    console.log("Failure callback on : " + response.url);
    failureCallback();
  }
};
export default standardHandle;
