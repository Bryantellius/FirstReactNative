// Function for api calls, takes in url, method, body;
// Returns res.json of call
export const apiService = async <T = any>(
  url: string,
  method: string = "GET",
  body?: {}
) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return <T>await res.json();
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
