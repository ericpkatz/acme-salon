//server & requirements
const express = require('express');
const app = express();
const { seed, db, Sequelize, Client } = require("./db/index");
const path = require('path');

//middleware
app.use(express.json());
app.use('/common', express.static('common'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

//routes
app.get('/api/clients/:id', async(req, res, next)=> {
  try {
    const client = await Client.findByPk(
      req.params.id
    );
    if(client){
      res.send(client);
    }
    else {
      res.status(404).send({ error: 'NOT FOUND'});
    }
  }
  catch(ex){
    next(ex);
  }
});

app.get("/api/clients", async(req, res, next)=> {
  try{
    res.send(await Client.findAll({
      attributes: [
        'id', 'name'
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/clients', async(req, res, next)=> {
  try {
    const clients = await Client.create(req.body);
    res.status(201).send(clients);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/clients/:id', async(req, res, next)=> {
  try {
    const client = await Client.findByPk(req.params.id);
    await client.update(req.body);
    res.send(client);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/clients/:id', async(req, res, next)=> {
  try {
    const client = await Client.findByPk(req.params.id);
    await client.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err });
});


//connect to port
const port = process.env.PORT || 3000;

app.listen(port, async ()=> {
    try{
     console.log(`listening on port ${port}`);
     await seed();
     console.log('done seeding');
    }
    catch(err){
      console.log(err);
    }
});



//curl localhost:8080/api/clients/2
//curl localhost:8080/api/clients -X POST -v -d '{"name": "Karen"}' -H 'Content-Type:application/json'
//curl localhost:8080/api/clients/4 -X DELETE
