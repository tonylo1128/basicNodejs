const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let ListToDo = [
  {
    toDo: "Find Power Stone",
    finish: false,
    id:1
  },
  {
    toDo: "Find Space Stone",
    finish: false,
    id:2
  },
  {
    toDo: "Find Reality Stone",
    finish: false,
    id:3
  },
  {
    toDo: "Find Time Stone",
    finish: false,
    id:4
  },
  {
    toDo: "Find Soul Stone",
    finish: false,
    id:5
  },
  {
    toDo: "Find Mind Stone",
    finish: false,
    id:6
  }
];
app.get("/", (req, res) => {
  // console.log("Welcome to the console");
  // res.send('Welcome Dumbass');
  res.render("pages/index", {
    data: ListToDo
  });
});

app.get("/todolist/create", (req, res) => {
  res.render("pages/todolist",{
      editData:null
  });
});


app.get('/todolist/edit/:id', (req, res)=>{
    let getUrlID = parseInt(req.params.id);
    console.log(getUrlID);

    let tempData = ListToDo.filter((item)=>item.id===getUrlID);

    let tempObj={};
    tempObj = tempData[0];
    // console.log(tempData[0]);
    // console.log(tempData);
    // console.log(tempData[0].toDo);


    res.render("pages/todolist", {
        editData: tempObj
    });
});

app.post("/todolist/create", (req, res) => {
    let temp = req.body.inputToDoList;
    console.log(temp);

    let max = 0;
    for(let i=0; i<ListToDo.length; i++){
        if(ListToDo[i].id>max){
            max = ListToDo[i].id;
        }
    }

    let tempList = {
      toDo: temp,
      finish: false,
      id: max+1
    }
  
    ListToDo = [...ListToDo, tempList];

  res.redirect('/');

});

app.get("/delete/:id", (req, res)=>{
    let theDeleItem = parseInt(req.params.id);
  
    ListToDo = ListToDo.filter((item)=>item.id!==theDeleItem)

    res.redirect("/");
}); 





app.listen(8002);
