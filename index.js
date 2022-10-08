const express = require('express');
const path = require('path');
const user = require('./user.json');

const PORT = process.env.port || 8081;
const app = express();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, './home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
app.get('/profile', (req, res) => {
  return res.status(200).json(user);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  password is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
app.get('/login', (req, res) => {
  // user = fs.readFileSync('./user.json')
  // console.log(user);
  /**
   * send a request to server with a username and password (as query string param)
   *  - Server response is based on authentication. Username and Password must match
   *    what is in the JSON file
   *  - send a request with user and password
   *  - check if params are good
   *  - respond
   *
   */

  const { username, password } = req.query;
  // check if username and password match the one in the JSON file
  if (username !== user.username) {
    return res.status(403).json({ status: false, message: 'User Is Invalid' });
  } else if (password !== user.password) {
    return res
      .status(403)
      .json({ status: false, message: 'Password Is Invalid' });
  }
  return res.status(200).json({ status: true, message: 'User is Valid' });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
app.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.<b>`);
});

app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
