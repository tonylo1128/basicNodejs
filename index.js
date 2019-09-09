const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const toDoListController = require('./Controllers/toDoListCon')

app.get("/", toDoListController.getIndex);
app.get("/todolist/create", toDoListController.getCreateForm);
app.get('/todolist/edit/:id', toDoListController.getEditForm);
app.post("/todolist/create", toDoListController.postCreateForm);
app.post("/todolist/edit/:id", toDoListController.postEditForm);
app.get("/delete/:id", toDoListController.deleteItem); 
app.get("/updateState/finish/:id", toDoListController.updateFinishState);




app.get("/api/getData", toDoListController.apiGetData)
app.get("/api/updateState/finish/:id", toDoListController.apiUpdateFinishState)
app.post("/api/create", toDoListController.apiForCreate)
app.get("/api/delete/:id", toDoListController.apiForDelete)
app.post("/api/todolist/edit/:id", toDoListController.apiForEdit)



app.listen(8000);
