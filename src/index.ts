import { UrlController } from './controller/UrlController'
import express from 'express'
import { MongoConnection } from 'database/MongoConnection';

const api = express();
api.use(express.json());

const database = new MongoConnection()
database.connect()

/*api.get('/test', (req, res) => {
    res.json({success: true})
})*/

const urlController = new UrlController()

api.post('/shorten', urlController.shorten)

api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express listening'))