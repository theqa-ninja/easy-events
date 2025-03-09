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

## helpful ruby commands

### Generate only a db migration
`rails generate migration CreateVolunteerNotes`

### generate a db + models + tests
`rails generate scaffold organizations`
