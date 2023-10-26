// Task1: initiate app and run server at 3000
const express=require('express')
const mongoose=require('mongoose');

const empdata=require('./model/data');
const app=new express();
app.use(express.json());
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

//mongoose.connect('mongodb://127.0.0.1:27017/HospitalDB')
mongoose.connect('mongodb+srv://anjanavu2000:anjana2000@cluster0.trc3jzo.mongodb.net/employeeDB?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
  try{
    const data=await empdata.find();
    res.status(200).json(data);}
    catch(error){
      res.status(404).json(error)

    }
  }
)



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await empdata.findById(id);
      res.status(200).json(data);
  } catch (error) {
      res.status(404).json(error);
  }
});





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
  const data = new empdata({
       name: req.body.name,
      position: req.body.position,
      location :req.body.location,
      salary :req.body.salary
    })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(404).json( error)
  }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedData = await empdata.findByIdAndDelete(id);
    res.status(200).json('Data deleted successfully');
  } catch (error) {
    res.status(404).json(error);
  }
});





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
  try {
    const data=req.body;
    const updatedData = await empdata.findOneAndUpdate({_id:data._id},data)
      res.status(200).json(updatedData);
  } catch (error) {
      res.status(404).json(error);
  }
});








//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log("listening to the port 3000")
})


