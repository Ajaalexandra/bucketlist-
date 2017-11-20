insert into bucketlist (countryid, userid)
values ($1, $2);
select * from bucketlist where userid = $2;
