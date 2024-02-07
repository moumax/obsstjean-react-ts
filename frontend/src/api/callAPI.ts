const callAPI = (url: RequestInfo | URL) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());

export default callAPI;
