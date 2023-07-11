# App-InventoryMg
## Video de cómo funciona la aplicación: https://youtu.be/sDnYtA9YVmI


## Para ejecutar la aplicación:

- Node.js: Asegúrate de que el equipo tenga Node.js instalado. Puedes descargar e instalar la versión LTS más reciente de Node.js desde el sitio web oficial: https://nodejs.org
Verifica si npm está instalado ejecutando el siguiente comando en la terminal:

```
npm --version
```

- Abre una terminal en la carpeta del proyecto (la carpeta raíz donde se encuentra el archivo package.json). Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```
npm install
```
## Ejecutar la aplicación:
  
- Conexión a la base de datos, ir a src/backend/config/:
```
node database.js
```
- Hacer migraciones de los modelos, ir a src/backend/migrations/:
```
node migrate.js
```
- Para iniciar el frontend, ir a src/frontend/my-app:
```
npm start
```
- Para iniciar el backend, ir a src/backend/:
```
node index.js
```
    
