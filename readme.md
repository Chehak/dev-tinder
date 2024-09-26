Create a repository
node_modules , package.json v/s package_lock.json 
.bin folder inside node_modules 
What are dependencies 
what is the meaning of -g while npm install 
Difference between caret ^ and tilde ~
Insatll Express 
Create a server in express 
Listen to port 3000 
Write request handler for '/hello' '/test'


Order of writing the route matters a lot !! 
Install postman 
Play with it 
Play with get post delete patch put api's 

Routes can also be written with patterns like a?bc , ab+c ,ab*c , a(bc)+d  
 regex link /a/, /.*fly$/  , you can create your own regex also
 Read the query params in the routes and reading the dynamic routes


 Route Handlers -play with the code 

Starts from here : 
 next()
 next() function and errors along with res.send()

    app.use('/route',rh1,rh2,rh3) 
    app.use('/route',[rh1,rh2],rh3) 
    app.use('/route',rh1,rh2,[rh3]) 
    All the structures will work the same way 
 What is middleware ? why do we use it?
 How express js basically handles requests behind the scenes
 Difference app.use and app.all
 Write a dummy auth middleware for admin
 Write a dummy auth middleware for all the routes, expect /user/login
 Error handling using app.use("/",(err,req,res,next)=>{})