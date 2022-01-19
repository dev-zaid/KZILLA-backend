const {
    initDB,
    createContact,
    updateContact,
    findContact,
    deleteContact,
    registerUser,
} = require("./src/utils/database.js");
const express = require("express");
const { NextFunction } = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { hash, genSalt, compare } = require("bcrypt");

const teleDB = initDB("telephoneDirectory");
const userDB = initDB("users");

app.use(express.json());

const middleware = (req, res, next) => {
    try {
        const token = req.get("authorization");
        console.log(token);
        if (!token || token.length === 0) {
            return res
                .status(403)
                .json({ message: "Token not found in header." });
        }
        const userData = jwt.verify(token, "verySecretCode");
        res.locals.user = userData;
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Token could not be verified." });
    }
};

app.get("/", async (req, res) => {});

app.get("/register", async (req, res) => {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userPhone = req.body.phone;
        const password = req.body.password;

        console.log(userName, userEmail, userPhone, password);

        const hashedPass = await hash(password, await genSalt(12));

        await registerUser(userDB, userName, userEmail, userPhone, hashedPass);
        res.send("User Registered");
    } catch (err) {
        console.log(err);
    }
});

app.get("/login", async (req, res) => {
    const userEmail = req.body.email;
    const password = req.body.password;
    let hashed = "";
    const userData = await (await userDB).findOne({ email: userEmail });
    if (!userData) {
        res.status(404).json({ message: "User does not exist" });
    } else {
        hashed = userData.pass;
    }
    const flag = await compare(password, hashed);
    console.log(flag);
    if (!flag) {
        return res.status(403).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userEmail }, "verySecretCode");
    console.log(token);
    res.json({ message: "User logged in successfully" });
});

//crud routes
app.get("/create", async (req, res) => {
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    await createContact(teleDB, name, phoneNo);
    res.send("Contact added");
});

app.get("/delete", middleware, async (req, res) => {
    const name = req.body.name;
});

app.get("/read", middleware, async (req, res) => {
    const name = req.body.name;
    contactList = await findContact(teleDB, name);
    res.send(contactList);
});

app.get("/update", middleware, (req, res) => {
    const keyName = req.body.keyName; //name to look for in database
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    contactList = updateContact(teleDB, keyName, name, phoneNo);
    res.send(contactList);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
