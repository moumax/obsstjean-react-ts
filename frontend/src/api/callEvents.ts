const callEvents = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default callEvents;
