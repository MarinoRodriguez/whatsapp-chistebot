// start.js
const { exec } = require('child_process');

exec('node index.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al iniciar el bot: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }
    console.log(`Salida: ${stdout}`);
});

