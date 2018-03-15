const express = require('express');
const fs = require('fs');

var hbs = require('hbs');

var app=express();

var port = process.env.PORT || 3000;
app.use((req,res,next)=>{

   var now = new Date().toString();
   var log = `${now} : ${req.method} ${req.url}`;
   fs.appendFile('server.log',log + '\n', (err)=>{

     if(err)
     {
       console.log('unable to append the contents');
     }

   });

   next();
});

// used for maintenance to block... notice next() is not called
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// } );

// below code is used for serving static page
app.use(express.static(__dirname + '/public'));


//instruct express to use view engine hbs for rendering ... the default path it uses is views folder
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
// injecting dynamic value using res.render

app.get('/', (req,res)=>{

//  res.send('<h1>Hello World</h1>');
  // res.send({
  //   Name:'Nandeesh',
  //   Address: {
  //     Street: 'J P Nagar',
  //     City: 'Bangalore'
  //   }
  // });

  res.render('home.hbs',{
    Name: 'Nandeesh',
    homeTitle : ' My Sweet Home !!!!',
    // currentYear: new Date().getFullYear()
  });

});


app.get('/about',(req,res)=>{

  res.render('help.hbs',{
    pageTitle:'Help Page',
    currentYear: new Date().getFullYear()
  });

  res.send("I am going to add about")

});

app.get('/help',(req,res)=>{
  res.render('help.hbs',{
    Name: 'Nandeesh',
    pageTitle: 'Help page .....',
    currentYear: new Date().getFullYear()
  });
});

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    ProjectTitle : 'First sub project'

  });
});

app.get('/bad',(req,res)=>{

  res.render('help_test.hbs');

  // res.send({
  //   error : 'Not Good '
  // });

});
app.listen(port,()=>{
  console.log('Server is listening on port 3000');
});
