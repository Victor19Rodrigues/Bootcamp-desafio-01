const express = require("express");

const server = express();

const projects = [];
let numberOfRequests = 0;

server.use(express.json());

function checkIfProjectsExist(req, res, next) {
  const { id } = req.params;

  const project = projects.find(element => element.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

function countRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Number of requests: ${numberOfRequests}`);

  return next();
}

server.use(countRequests);

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIfProjectsExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(element => element.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkIfProjectsExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(element => element.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkIfProjectsExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(element => element.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
