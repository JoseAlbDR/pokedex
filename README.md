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

5. Recounstruir la base de datos con la semilla

- Seed primero borra todos los datos de la base de datos y despues hace la repoblación

```
  http://localhost:3000/api/v1/seed
```

## Stack usado

- MongoDB
- Nest
