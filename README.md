# Serverless-credit-card-challenge

## Instalaciones necesarias para ejecutar localmente
`npm install -g serverless`  
`npm install serverless-offline -g`

---
## Instalar redis
https://redis.io/docs/install/install-redis/

---
## Configurar variables de entorno para la conexión a redis y private key
`export REDIS_HOST=127.0.0.1 `    
`export REDIS_PORT=6379  `  
`export PRIVATE_KEY=my_private_key  `  

---
## Levantar proyecto offline 
`npm run invoke:offline`

---
## Test 
`npm run test`



---
## API 
*Toda peticion debe tener el header Authentication: Bearer {{private_key}} con el valor asignado anteriormente*

### URL Crear data de token
`POST /token  `  
*todos los campos son requeridos*
#### Parámetros de solicitud
```json
{
	"email": "test@gmail.com",
	"card_number": "4558950018068423",
	"cvv": "123",
	"expiration_month": "06",
	"expiration_year": "2024"
}
```

### URL Obtener data de token
`GET token/{tokenId}`
*Response*
```json
{
	"email": "test@gmail.com",
	"card_number": 4558950018068423,
	"expiration_month": "06",
	"expiration_year": "2024"
}
```
