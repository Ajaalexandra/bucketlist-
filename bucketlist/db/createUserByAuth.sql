insert into users(authid, name) values($1, $2);
select * from users where authid= $1;
