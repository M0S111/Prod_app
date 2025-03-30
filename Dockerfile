FROM postgres:latest

# Set the PostgreSQL password (not recommended for production without proper security)
ENV POSTGRES_PASSWORD "devpass"

# Set the PostgreSQL user (default is postgres)
# ENV POSTGRES_USER postgres

# Set the default database name
ENV POSTGRES_DB store_db

# Expose the PostgreSQL port
EXPOSE 5432

# The postgres entrypoint script already handles database initialization
# based on the environment variables POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.

# No explicit command is needed here as the base image has a default CMD
# that starts the PostgreSQL server.