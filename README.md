<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar

```
  yarn install
```

3. Tener Nest CLI instalado

```
  npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
  docker-componse up -d
```

5. Clonar el archivo `.env.template` y renombrar la copia a `.env`

6. Rellenar las variables de entorno definidas en el `.env` con datos propios

7. Ejecutar la aplicación en dev:

```
  yarn start:dev
```

o

```
  npm run dev
```

9. Recounstruir la base de datos con la semilla

- Seed primero borra todos los datos de la base de datos y despues hace la repoblación

```
  http://localhost:3000/api/v1/seed
```

Deplyed in Railway

## Stack usado

- MongoDB
- Nest

# Production Build

1. Crear el archivo `.env.prod`
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen

```
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

4. Volver a montar la imagen creada

```
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
