# Charlie

![Let's get him a new ratstick!](http://oi61.tinypic.com/w7xzcz.jpg)

### What?
A script that will take care of some (hopefully most?) of the Charlie work involved in setting up an API - database schema and route generation. It is all fairly boilerplate, but by not wrapping it in a module and instead generating source, you are able to use and modify at will. 

My initial goal is to support [HapiJS](https://github.com/hapijs/hapi) (a Node HTTP framework) on the server side and [MongoDB](http://www.mongodb.org) on the database side. Ideally the architecture will be such that adding other frameworks/databases is just a matter of outputting the correct syntax. I would eventually like to support at least 1 flavor of SQL database (MySQL/Postgres, for example).

### How?

```sh
$ node charlie /Users/tupakapoor/rats/schema.json
```
The only argument to the script is the path to a JSON file that is a schema for your object models. Using this schema, we can very easily create the database side of things, but also generate all of the object CRUD routes and their basic functionality.

### Why?

I wasted way too much time trying to set this all up manually (without having much of a background in either Node/Hapi or Mongo) so I figured other people would probably have the same problems as well. I decided to write this in [Node.js](http://www.nodejs.org) as an exercise for myself.

### Who?

Intern is written and maintained by [Ameesh Kapoor](http://github.com/tupakapoor) ([@tupakapoor](http://twitter.com/tupakapoor)) with significant advice and input from [Johnny Domino](http://github.com/jmonster) ([@jmonsterflex](http://twitter.com/jmonsterflex)) of [Yayuhh LLC](http://yayuhh.com). Please feel free to contribute or say hi on Twitter.
