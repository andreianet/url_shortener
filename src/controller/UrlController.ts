import { URLModel } from 'database/model/Url';
import {Request, Response} from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';

export class UrlController{
    public async shorten(req: Request, response: Response): Promise<void> {
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		response.json(newURL)
	}

    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar hash
        const {hash} = req.params
        const url = await URLModel.findOne({hash})

        if (url) {
            res.redirect(url.original)
            return
        }
        res.status(400).json({error: 'Url not found'})
        
    }
}