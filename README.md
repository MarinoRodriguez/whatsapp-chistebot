Para acceder a las variables de entorno, utiliza el archivo .env y el paquete dotenv. Puedes importar las variables en tu archivo principal de la siguiente manera: 
require('dotenv').config(); 
const api_url = process.env.API_URL; 
const api_key = process.env.API_KEY;

Inicia tu bot con PM2 usando el siguiente comando, que también programará el reinicio cada 6 horas
pm2 start start.js --name "mi-bot" --cron "0 */6 * * *"

Verifica que tu bot esté corriendo con el siguiente comando
pm2 list

para ver los logs de un bot especifico
pm2 logs mi-bot

para detener el bot 
pm2 stop mi-bot

y para reiniciar el bot
pm2 restart mi-bot