console.log("it works");

const remote = "http://127.0.0.1:5984";
const inlineLogger = document.querySelector("#status");

const loginForm = document.querySelector("#loginform");
loginForm.addEventListener("submit", e => {
  console.log("submit!!");
  e.preventDefault();
  login();
});

const writeButton = document.querySelector("#write");
writeButton.addEventListener("click", e => {
  console.log("write!!");
  e.preventDefault();
  testWrite();
});

function login() {
  const username = document.querySelector("#user").value;
  const password = document.querySelector("#password").value;

  var headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(username + ":" + password));

  return fetch(`${remote}/_session`, { headers: headers })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.error) throw response;
      inlineLogger.innerHTML = "logged in";
      return response;
    });
}

function testWrite() {
  const remoteDB = new PouchDB(`${remote}/test`);

  var doc = {
    _id: "mittens",
    name: "Mittens",
    occupation: "kitten",
    age: 3,
    hobbies: [
      "playing with balls of yarn",
      "chasing laser pointers",
      "lookin' hella cute"
    ]
  };
  remoteDB
    .put(doc)
    .then(ok => {
      console.info("ok", ok);
      if (ok.error) throw ok;
      inlineLogger.innerHTML = JSON.stringify(ok);
      return ok;
    })
    .catch(no => {
      console.info("no", no);
      inlineLogger.innerHTML = JSON.stringify(no);
      return no;
    });
}
