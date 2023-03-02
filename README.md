# Requirements

- create a sequelize model of your choice that represents something you are interested in.
  - **One model is fine**
  - **You don't need to use any foreign keys**
  - make sure your model has at least
    - one ENUM field 
    - one VIRTUAL field 
    - one field which uses one of the sequelize validation properties

- use the **server.js** file to generate your table using your connections sync method
- seed some data
- create an api route for getting the items in your model 
  - **GET /api/your item name pluraized**
  - should return an array of data (in json format)
- create an api route for getting a single item in your model 
  - **GET /api/your item name pluraized/:id**
  - should return a single item (in json format)
  - if the item does not exist for that id you should return a 404 status code
- create an api route which will allow you to create an item 
  - **POST /api/your item name pluraized**
  - It should return the item (in json format) and a status code of 201
- create an api route which will allow you to destroy an item 
  -  **DELETE /api/your item name pluraized/:id**
  - This route should return a status code of 204 
- create an api route which will allow you to update an item 
  - **PUT /api/your item name pluraized**
  - It should return the item (in json format)

# Testing

- use curl to test all of your routes
- assume users will be making requests by sending json formatted data

# Sample curl commands

```
curl localhost:3000/api/pages
curl localhost:3000/api/pages -X POST -v -d '{"title": "FOO"}' -H 'Content-Type:application/json'
curl localhost:3000/api/pages/8 -X DELETE
```
