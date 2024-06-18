import { Item } from "../../server/ItemCaptionmodel.mjs";



const SERVER_URL = 'http://localhost:3001';



/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> } 
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
          response.json()
            .then(json => resolve(json))
            .catch(err => reject({ error: "Cannot parse server response" }))
        } else {
          // analyzing the cause of error
          response.json()
            .then(obj =>
              reject(obj)
            ) // error msg in the response body
            .catch(err => reject({ error: "Cannot parse server response" })) // something else
        }
      })
      .catch(err =>
        reject({ error: "Cannot communicate" })
      ) // connection error
  });
}

// function getJson(httpResponsePromise) {
//   return new Promise((resolve, reject) => {
//     httpResponsePromise
//       .then((response) => {
//         if (response.ok) {
//           response.json()
//             .then(json => resolve(json))
//             .catch(err => {
//               response.text().then(text => {
//                 console.error("Error parsing JSON:", text);
//                 reject({ error: "Cannot parse server response", details: text });
//               });
//             });
//         } else {
//           response.json()
//             .then(obj => reject(obj))
//             .catch(err => {
//               response.text().then(text => {
//                 console.error("Error parsing JSON:", text);
//                 reject({ error: "Cannot parse server response", details: text });
//               });
//             });
//         }
//       })
//       .catch(err => {
//         console.error("Network error:", err);
//         reject({ error: "Cannot communicate", details: err });
//       });
//   });
// }


const getUserHistory = async () => {
  return getJson(
    fetch(SERVER_URL + "history/get", {
      credentials: 'include'
    })
  ).then((response) => { return response })
}


const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  return getJson(fetch(SERVER_URL + 'sessions/current', {
    // this parameter specifies that authentication cookie must be forwared
    credentials: 'include'
  })
  )
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const getItems = async (isLoggedIn) => {
    const response = await fetch(SERVER_URL + '/items/' + isLoggedIn)
    if(response.ok) {
      const itemsJson = await response.json();
      return itemsJson.map(item => new Item(item.id, item.name, item.cap1, item.cap2));
    }
    else
    throw new Error('Internal server error');
}

const getCaptionsForItem = async (itemId) => {
  const response = await fetch(SERVER_URL + '/captions/' + itemId);
  if(response.ok) {
    const responseJson = await response.json();
    console.log(responseJson, "response from getCaptionsForItem"+itemId);
    return responseJson;
  }
  else {
    throw new Error('Internal server error');
  }
}

const getRandomCaptionsExcluding = async (excludeIds) => {
  const response = await fetch(SERVER_URL + '/captions/random/' + excludeIds.join(','));
  if(response.ok) {
    console.log(response, "response from getRandomCaptionsExcluding");
    return await response.json();
  }
  else {
    throw new Error('Internal server error');
  }
}

const API = { getItems, getCaptionsForItem, getRandomCaptionsExcluding, logIn, logOut, getUserInfo, getUserHistory };
export default API;