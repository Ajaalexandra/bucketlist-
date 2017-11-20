delete from visited where countryid = $1  and userid = $2;
select * from visited where userid = $2;
