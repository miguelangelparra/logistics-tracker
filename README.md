# logistics-tracker
Rastreador logistica

Pasos para probar:
- Instalar dependencias de Frontend en la carpeta client 
  - Ejecutar por consola => npm i
- Tener disponible Truffle o Ganache en la maquina de prueba
- Configurar el mnemonic en el archivo truffle-config.js
- Ejecutar la compilacion/migracion de los contratos a traves de Truffle 
  -> truffle develop
  -> truffle compile
  -> truffle migrate --network ganache
- Por default el proyecto está configurado para ejecutarse en Ganache en caso de utilizar una red distinta debe modificar la configuracion del frontend en el archivo _app.js

