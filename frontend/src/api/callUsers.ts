const callUsers = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default callUsers;