export const serviceHandler = async (url, method, params, body) => {
  await fetch(url, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-origin":"CMS"
    },
  })
    .then((response) => response.json())
    .then((resultData) => {
      return resultData;
    })
    .catch((error) => {
      return error;
    });

  
};
