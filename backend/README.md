# README

## Get up and running

1. Create your user `ez_admin` for postgres
2. Run `bin/setup` or run the following set of commands

```
bundle install
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed
```

3. Run `bundle exec rails s` to get your backend server running.

## one-time setup

Run `psql -d postgres`

In the postgres= prompt, run:

```
CREATE USER ez_admin WITH PASSWORD 'c0rny-pa$$word%';
ALTER ROLE ez_admin createrole createdb;
```
## turn on postgres
`brew services start postgresql@14`

## undo a table migration
this way you can redo the columns or foreign keys
`rails db:rollback STEP=1`

## helpful ruby commands

### Generate only a db migration
`rails generate migration CreateVolunteerNotes`

### generate a db + models + tests
`rails generate scaffold organizations`

### Linter

we're using Rubocop! `rubocop --plugin rubocop-rails` to see what it finds and `rubocop --plugin rubocop-rails -A` to auto-fix those it can

### db:reset won't work!
often says something like
```
PG::ObjectInUse: ERROR:  database "easy_events_development" is being accessed by other users
DETAIL:  There is 1 other session using the database.
```
you can drop the connection via `psql -d postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'easy_events_development' AND pid <> pg_backend_pid();"`
