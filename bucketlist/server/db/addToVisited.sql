insert into visited (countryid, userid)
values ($1, $2);
select * from visited where userid = $2;
