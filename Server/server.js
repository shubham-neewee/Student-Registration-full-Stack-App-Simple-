const http = require('http')
const db = require("./db");

const port = process.env.PORT || 4000;


const server = http.createServer( (req,res)=> {
    //For CORS
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

   //Pre-Flight
    if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

    const [url,query] = req.url.split('?')
    const method = req.method
    const params =  new URLSearchParams(query);

  if(url === '/users' && method === 'GET') {
    db.db.query('SELECT * FROM users', (error,result) => {
        if(error) {
            res.statusCode=500;
            res.end(JSON.stringify({"Status": "Database Error"}))
        }
        res.end(JSON.stringify(result))
    })
  }
  else if (url === "/create-user" && method === 'POST') {
    let body = "";
    req.on('data', (data)=>{
        body += data.toString()
    })
    req.on('end', async ()=> {
        const {name,e_mail} = JSON.parse(body)
        console.log("E-mail", e_mail)
        console.log("Name", name)

       
        if(!name || !e_mail) {
            res.statusCode = 400;
            return res.end(JSON.stringify({"status":"fail","message" : "Name or E-mail is Empty"}))
        }

        db.db.query('INSERT INTO users (name,email) values (?,?)', [name, e_mail],(error, result)=> {
            if(error) {
                res.statusCode=500;
                return res.end(JSON.stringify({"status": "failed","message": "Failed, Database Error, Maybe User already exists"}))
            }
            res.end(JSON.stringify({"Name": name, "E-mail" : e_mail, "status" : "success","message":"user added successfully"}))
        })
        

    })
  }
  else if(url === '/delete-user' && method==='DELETE') {
    const delete_user_email = params.get('email');
    console.log("Split", delete_user_email)

    db.db.query('DELETE FROM users WHERE email = ?',[delete_user_email],(err) => {
        if(err) {
            return res.end(JSON.stringify({"status": "failed","message":"Not able to delete"}))
        }
        res.end(JSON.stringify({"status": "success", "message" : "user deleted successfully"}))
    })
  }
})


server.listen(port,()=>{
    console.log(`Server Running On ${port}`)
})
