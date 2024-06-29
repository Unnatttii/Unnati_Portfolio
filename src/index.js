var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/personaldb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

// this entry is for mongodb storage

var db=mongoose.connection;
//if connection error appears

db.on('error',()=>console.log("error in connecting to Database"));
db .once('open',()=>console.log("connected to database"))


app.post("/index.html",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var projects= req.body.projects;

    var data={
        "name":name,
        "email":email,
        "projects":projects
    }
//to check for errors. agar error aaya to throw err hoga

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");