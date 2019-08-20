const express = require("express");

const server = express();

const projects = [];

server.use(express.json());

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(element => element.id === id);

  project.title = title;

  return res.json(project);
});

server.listen(3000);
