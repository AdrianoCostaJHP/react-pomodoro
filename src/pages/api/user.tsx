import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDataBase } from '../../utils/mongodb';

export default async (request: VercelRequest, response: VercelResponse) => {

    const { db } = await connectToDataBase();
    const collection = db.collection('users');
    
    try {
        
        const { method } = request;
        switch (method) {

            case 'GET':

                const email = request.query.email;
                try{
                    const data = await collection.findOne({_id: email}).then();
                    response.status(201).json(data);
                    
                }
                catch (err) {
                    return err;;
                }

                break;

        }
    } catch (err) {
        response.status(500).json({
            statusCode: 500, message: err.message
        })
    }

}