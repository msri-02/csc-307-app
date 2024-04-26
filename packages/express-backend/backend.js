// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  userServices.getAllUsers()
  .then ((result) => {
    res.send({users_list: result})})
  .catch(error => {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id)
  .then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({users_list: result});
    }
  })
  .catch((error) => {
    res.status(500).send(error.name);
  })
});


app.get("/users?name=<name>", (req, res) => {
  const name = req.params["name"]; //or req.params.id
  userServices.findUserByName(name)
  .then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ users_list: [result] })
    }
  })
  .catch((error) => {
    res.status(500).send(error.name);
  })
});

app.get("/users?job=<job>", (req, res) => {
  const job = req.params["job"]; //or req.params.id
  userServices.findUserByJob(job)
  .then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({users_list: result});
    }
  })
  .catch((error) => {
    res.status(500).send(error.name);
  })
});

app.get("/users?name=<name>&job=<job>", (req, res) => {
  const name = req.params["name"];
  const job = req.params["job"];
  userServices.getUsers(name, job)
  .then ((result) => {
    res.send({name: name})})
  .catch(error => {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.deleteUser(id)
  .then ((result) => {
    if (result) {
      res.status(204).send({ users_list: result });
    } else {
      res.status(404).send({ error: "User not found" });
    }})
  .catch(error => {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      res.status(500).send(error.name);
    })
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices
    .deleteUser(id)
    .then((res) =>  res.status(204).send("User successfully deleted"))
    .catch((error) => {
      res.status(500).send(error.name);
    })
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});