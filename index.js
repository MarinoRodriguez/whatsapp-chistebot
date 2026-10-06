require('dotenv').config();
const qrcode = require('qrcode-terminal');
const {  Client, LocalAuth } = require('whatsapp-web.js');
// const schedule = require('node-schedule');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chistes.db');

const idChannel = "18495123139";

const client = new Client({
    clientId: "1",
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('message', async message => {
    
        console.log(`Mensaje recibido: ${message.body}`);
        // const response = await ChatAI(message.body);
        // console.log(response);
        // message.reply(response);
    
    
});

client.on('ready', async () => {
    console.log('Client is ready!');
    await client.sendMessage(idChannel, 'Bot iniciado');
});

client.initialize();

// Cerrar la base de datos al finalizar
process.on('exit', () => {
    db.close();
});

// function sendMessage(destinatario, message) {
//     client.sendMessage(destinatario, message);
// }

async function ChatAI(message) {

    const prompt = message;
    let attempts = 0;
    const maxAttempts = 5; // Número máximo de intentos

    while (attempts < maxAttempts) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text; // Retorna el chiste generado
        } catch (error) {
            console.error(`Error al generar chiste: ${error.message}`);
            attempts++;
            if (attempts < maxAttempts) {
                console.log(`Reintentando... (${attempts}/${maxAttempts})`);
            } else {
                console.log('Se alcanzó el número máximo de intentos. No se pudo generar un chiste.');
                // throw error; // Lanza el error si se alcanzó el máximo de intentos
            }
        }
    }
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();
    // return text;

    //   const result = await chat.sendMessage(message);
    //   const response = await result.response;
    //   const text = response.text();
    //   return text;
  }
  