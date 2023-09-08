export async function fetchData(url, method, headers, body, method_fetch) {
  let response;
  try {
    if (method_fetch === null) {
      response = await fetch(url, {
        method: method,
        headers: headers,
      });
    } else if (method_fetch === "body") {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
    } else if (method_fetch === "formData") {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
    }

    const responseData = await response.json();

    if (!response.ok) {
      return {
        error: responseData.detail,
      };
    }

    return responseData;
  } catch (error) {
    return {
      error: "Brak połącznia z serverem!",
    };
  }
}
