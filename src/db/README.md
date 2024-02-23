## Source envs

Before running this scripts, you should source the below environment variables.

```dotenv
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=haslo123
DATABASE_SCHEMA=travel_app
ENV=development
```

You can source the above envs by running the following command.

```bash
$ export $DATABASE_HOST=localhost
```

## Migration

Run the following commands to create a migration file. Replace `MigrationName` with the name of the migration. Resulting file will be created in `src/migrations` folder.

```bash
# Generate migration

# Unix systems
$ yarn typeorm:migration:generate

```

Run the following commands to run the migration. This should run missing migrations in the database.

```bash
# Run migration
$ yarn typeorm:migration:run
```

## Seeding

Run the following commands to create a seed file. Resulting file will be created in `src/seeds` folder.

```bash
# Create seed file
$ yarn typeorm:seed:create --name=SeedName
```

Run the following commands to run the seed. This should run the seed in the database.

```bash
# Run seed
$ yarn typeorm:seed:run
```

You can use factory to create many records at once. You can create a factory file in `src/factories` folder.
