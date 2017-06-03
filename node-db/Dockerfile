FROM postgres:9.6
LABEL maintainer "howiesecondburger"
EXPOSE 5432

# Seed sql file into docker container
COPY seed.sql /docker-entrypoint-initdb.d/
VOLUME /var/lib/postgresql/data