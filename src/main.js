const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

app.on('ready', () => {
    // Inicializa o servidor Node.js
    exec('node src/server.js', (err) => {
        if (err) {
            console.error('Erro ao iniciar o servidor Node.js:', err);
        }
    });

    // Cria a janela principal
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    // Carrega a aplicação Node.js no Electron
    mainWindow.loadURL('http://localhost:8000');
});

app.on('window-all-closed', () => {
    app.quit();
});
