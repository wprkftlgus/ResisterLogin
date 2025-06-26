const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const db = new Map();

app.use(express.cookieParser());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
 console.log(' server is running at 3000')   ;
});
app.post('/singup', (req,res) => {
    const {username, name, password } = req.body;
    const exists = db.get(username);

    if(exists){
        res.status(400).send('duplicate username: ${username}');
        return;
    }
    const newUser = {
        username,
        name,
        password,
    };
    db.set(username, newUser);
    res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
    res.redirect('/');

})
