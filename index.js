'use strict'

const { httpServer } = require('./src/app')

const port = 443

httpServer.listen(port,  () => {
    console.log('Example app listening on port 443! Go to https://localhost:443/')
});
