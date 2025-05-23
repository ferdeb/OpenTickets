# OpenTickets

[![Screenshot de la pagina inicial](/page.png)]()

Este es mi primer proyecto Open Source

OpenTickets, es un sistema para levantar tickets en una empresa, pero lanzado como Open Source, nacio como un proyecto escolar

Y antes de que muera en el olvido de mi disco duro, decido publicarlo.

🧰 Herramientas necesarias:
- Node.js
- npm

Clona la base de datos (MariaDB) y comprueba su ejecucion localmente
```sql
mysql -u TU_USUARIO -p
```

📁 1. Clona la carpeta de proyecto
```js
git clone git@github.com:ferdeb/OpenTickets.git
```

📦 2. Inicializar el proyecto y dependencias
```js
npm init -y
npm install express sequelize mariadb ejs
```

(Opcional para desarrollo con autorecarga)
```js
npm install --save-dev nodemon
```


🚀 3. Levantar el servidor
```js
node app.js
```
O con nodemon si lo instalaste:
```js
npx nodemon app.js
```