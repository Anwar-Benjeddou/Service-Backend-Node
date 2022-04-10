getAuth = function (req, res, next) {
  if(req.user) { 
    db.getPerms({role_id: req.user.role_id, resource_id: req.resource.id})
       .then(function(perms){
          var allow = false;
          //you can do this mapping of methods to permissions before the db call and just get the specific permission you want. 
          perms.forEach(function(perm){
              if (req.method == "POST" && perms.create) allow = true;
              else if (req.method == "GET" && perms.read) allow = true;
              else if (req.method == "PUT" && perms.write) allow = true;
              else if (req.method == "DELETE" && perm.delete) allow = true;

          })
          if (allow) next();
          else res.status(403).send({error: 'access denied'});
       })//handle your reject and catch here
   } else res.status(400).send({error: 'invalid token'})
}