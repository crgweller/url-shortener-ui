export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls").then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error gathering data! Status code: ${response.status}`);
    }
  });
};

export const postUrl = (newUrl) => {
  return fetch("http://localhost:3001/api/v1/urls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUrl),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error posting data! Status code: ${response.status}`);
    }
  });
}
