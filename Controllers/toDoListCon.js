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



  module.exports = {
    getIndex: (req, res) => {
        res.render("pages/index", {
          data: ListToDo
        });
      },

      getCreateForm: (req, res) => {
        res.render("pages/todolist",{
            editData:null
        });
      }, 

      getEditForm: (req, res)=>{
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
    },


    postCreateForm: (req, res) => {
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
    
    },

    postEditForm: (req, res)=>{
        let inputTemp = req.body.inputToDoList;
      
        let getUrlID = parseInt(req.params.id);
          console.log("fuck u on9 jai"+getUrlID);
      
          for (let i=0; i<ListToDo.length; i++){
              if(ListToDo[i].id===getUrlID){
                  ListToDo[i].toDo=inputTemp;
                  break;
              }
          }
      
          res.redirect('/');
      },

      deleteItem: (req, res)=>{
        let theDeleItem = parseInt(req.params.id);
      
        ListToDo = ListToDo.filter((item)=>item.id!==theDeleItem)
    
        res.redirect("/");
    },


    updateFinishState: (req, res)=>{
        let inputtemp = parseInt(req.params.id);
      
        for (let i=0; i<ListToDo.length; i++){
          if(ListToDo[i].id==inputtemp){
            console.log(ListToDo[i].finish);
            if(ListToDo[i].finish == false){
              ListToDo[i].finish = true;
              console.log(ListToDo[i].finish);
              
            }
            else{
              ListToDo[i].finish = false;
              console.log(ListToDo[i].finish);
            }
          }
            
        }
      
        res.redirect('/');
      },

      apiGetData: (req, res)=>{
          res.json({
            data: ListToDo
          })
      },

      apiUpdateFinishState:  (req, res)=>{
        let inputtemp = parseInt(req.params.id);
      
        for (let i=0; i<ListToDo.length; i++){
          if(ListToDo[i].id==inputtemp){
            console.log(ListToDo[i].finish);
            if(ListToDo[i].finish == false){
              ListToDo[i].finish = true;
              console.log(ListToDo[i].finish);
              res.json({
                msg: "Success, State changes to true"
              })
              break;
            }
            else{
              ListToDo[i].finish = false;
              res.json({
                msg: "Success, State changes to true"
              })
              console.log(ListToDo[i].finish);
              break;
            }
          }
            
        }
        res.json({
          msg: "Failed"
        })
        
      },

      apiForCreate:  (req, res) => {
        let temp = req.body.inputToDoList;

        console.log("Someone is calling me "+temp);
    
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
    
      res.json({
        msg:"Create Success"
      });

      
    
    },

    apiForDelete: (req, res)=>{
      
      let theDeleItem = parseInt(req.params.id);
      console.log("Someone ask me to delete things, things like "+theDeleItem)
      ListToDo = ListToDo.filter((item)=>item.id!==theDeleItem)
  
      res.json({
        msg: "Item Deleted"
      });
  },

    apiForEdit: (req, res)=>{
      let inputTemp = req.body.inputToDoList;
    
      let getUrlID = parseInt(req.params.id);
        console.log("This is apiFor Edit, and we got the id of : "+getUrlID);
        console.log("This is apiFor Edit, and we got the input of : "+inputTemp);
        
    
        for (let i=0; i<ListToDo.length; i++){
            if(ListToDo[i].id===getUrlID){
                ListToDo[i].toDo=inputTemp;
                break;
            }
        }
    
        res.json({
          msg: "Finish Update"
        });
    }
    
  }