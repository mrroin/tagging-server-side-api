# tagging-server-side-api
## Backend tagging Server Side

Esta api esta diseñada para exponer endponits capaz de recibir eventos específicos(path), con determinada estructura de datos (que pueden ser diferentes entre cada uno), para procesarlos y generar analíticas del lado del servidor con determinada estructura para enviarlas a los servicios de Cuentas de Analytics.

Esta implementación cuenta con:
  - Google Analytics
  - Meta

Cada instancia de esta api, esta preparada para atender una Cuenta de Analytics.

Actualmente la única analítica con restricción es Meta, ya que es requerido que se envíe el email, en caso que quien use el servicio no lo envíe a nivel raíz(```email```) o en el los parámetros extra(```extra.email```), la analítica no se enviará para evitar errores en parámetros de entrada.

## Variables de entorno para Cuentas de Google Analytics
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

## Variables de entorno para Cuentas de Meta

- META_URL*: Url para conectarse a Meta Analytics y enviar la analítica
  > ```META_URL=https://graph.facebook.com/v26.0```
- META_PIXEL_ID*: ID de medición para la cuenta
  > ```META_PIXEL_ID=35350609227918662```
- META_PIXEL_ACCESS_TOKEN*: Token de acceso para enviar la analítica
  > ```META_PIXEL_ACCESS_TOKEN=EAAophW6nrt...```
- META_PIXEL_DEBUG: Para colocar modo debug al envío de analíticas, true/false, por defecto false
  > ```META_PIXEL_DEBUG=true```
- META_PIXEL_ON: Para encender el envío de analíticas a Meta, true/false, por defecto false
  > ```META_PIXEL_ON=true```
- META_PIXEL_TEST_EVENT: Identificador de pruebas para Meta en tiempo real.
  > ```META_PIXEL_TEST_EVENT=TEST74593```

  
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

Esta api esta pensada para ser consumida por un webhook, que enviará datos mediante cada evento expuesto por el método POST, por esta razón no se deja un evento(path) genérico para atender y generar analíticas dinámicas. En caso de querer agregar otro evente se recomienda replicar la estructura y exponer un path diferente.

Actualmente se tienen las siguientes:
- ```/tagging/singup```: Evento que genera analítica para registro de un usuario
  - Evento generado, __api_singup__
- ```/tagging/first-deposit```: Evento que genera analítica para primer depósito de un usuario
  - Evento generado, __api_vivento_ftd__
- ```/tagging/deposit```: Evento que genera analítica para los depósitos de un usuario
  - Evento generado, __api_vivento_redeposit__
- ```/tagging/verify```: Evento que genera analítica para el la verificación de un usuario
  - Evento generado, __api_vivento_verify__

# Para el desarrollador
En caso de querer agregar más parámetros a la analítica se debe obtener de la petición y agregar en las funciones que sirven al ```Controller```, actualmente el DTO de entrada no está restringido a una validación exhaustiva de parámetros, por lo que los sericios permiten cualquier JSON de entrada, ahí es donde se podría mapear los datos a enviar a la analítica

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