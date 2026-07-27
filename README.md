# tagging-server-side-api
## Backend tagging Server Side

Esta api esta diseñada para exponer endponits capaz de recibir eventos específicos(path), con determinada estructura de datos (que pueden ser diferentes entre cada uno), para procesarlos y generar analíticas del lado del servidor con determinada estructura para enviarlas a los servicios de Cuentas de Analytics.

Esta implementación cuenta con:
  - Google Analytics

Cada instancia de esta api, esta preparada para atender una Cuenta de Analytics.

## Variables de entorno para Cuentas de Analytics
- GOOGLE_URL*: Url para conectarse a Google Analytics y enviar la analítica
  > ```GOOGLE_URL=https://www.google-analytics.com/mp/collect```
- GOOGLE_MEASUREMENT_ID*: ID de medición
  > ```GOOGLE_MEASUREMENT_ID=G-HQ8J0OYUH```
- GOOGLE_API_SECRET*: Clave secreta de GA4
  > ```GOOGLE_API_SECRET=IQoaLplVAHqZoHNoanLoZj```
- GOOGLE_DEBUG: Para colocar modo debug al envío de analíticas, true/false, por defecto false
  > ```GOOGLE_DEBUG=true```
- GOOGLE_ENGAGEMENT_TIME: Tiempo de interacción para el envío de analíticas, por defecto 1000
  > ```GOOGLE_ENGAGEMENT_TIME=1000```

Otras variables del proyecto:

- PORT*: Puerto para levantar el api
  > ```PORT=9002```
- GLOBAL_PREFIX*: Prefijo que se coloca al exponer los endpoint
  > ```GLOBAL_PREFIX=api```
- THROTTLE_LOGIN_TTL: Tiempo de vida para peticiones de login en milisegundos, por defecto 60000
  > ```THROTTLE_LOGIN_TTL=60000```
- THROTTLE_LOGIN_LIMIT: Límite de tiempo para el ttl para login, por defecto 60000
  > ```THROTTLE_LOGIN_LIMIT=1000```
- THROTTLE_SINGUP_TTL: Tiempo de vida para peticiones de singup en milisegundos, por defecto 1000
  > ```THROTTLE_SINGUP_TTL=60000```
- THROTTLE_SINGUP_LIMIT: Límite de tiempo para el ttl para singup, por defecto 60000
  > ```THROTTLE_SINGUP_LIMIT=1000```
- THROTTLE_FIRST_DEPOSIT_TTL: Tiempo de vida para peticiones de firstDeposit en milisegundos, por defecto 1000
  > ```THROTTLE_FIRST_DEPOSIT_TTL=60000```
- THROTTLE_FIRST_DEPOSIT_LIMIT: Límite de tiempo para el ttl para firstDeposit, por defecto 60000
  > ```THROTTLE_FIRST_DEPOSIT_LIMIT=1000```
- THROTTLE_FIRST_DEPOSIT_LIMIT: Tiempo de vida para peticiones de deposit en milisegundos, por defecto 1000
  > ```THROTTLE_FIRST_DEPOSIT_LIMIT=60000```
- THROTTLE_DEPOSIT_LIMIT: Límite de tiempo para el ttl para deposit, por defecto 60000
  > ```THROTTLE_DEPOSIT_LIMIT=1000```

> **_*_**  Requerido

## Eventos expuestos(path)
Aqui se agregan path del api para cada evento que hay que generar analítica, cada evento conoce su entrada y genera la analítica específica a enviar.

Esta api esta pensada para ser consumida por un webhook, que enviará datos mediante cada evento expuesto por el método POST, por esta razón no se deja un evento(path) genérico para atender y generar analíticas dinámicas

Actualmente se tienen las siguientes:
- ```/tagging/login```: Evento que genera analítica para inicio de sesión
- ```/tagging/singup```: Evento que genera analítica para resgistro de un usuario
- ```/tagging/first-deposit```: Evento que genera analítica para primer depósito de un usuario
- ```/tagging/deposit```: Evento que genera analítica para el depósito de un usuario

# Para el desarrollador

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# build
$ npm run build

# development
$ npm run start

# production mode
$ npm run start:prod
```