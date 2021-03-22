import { VercelRequest, VercelResponse } from '@vercel/node';
import {connectToDataBase} from '../../utils/mongodb';

export default async (request: VercelRequest, response: VercelResponse) => {

    const {db} = await connectToDataBase();
    const collection = db.collection('users');

    try {

        const { method } = request;

        switch (method) {
            case 'POST':
                const { email, uri_avatar, level, userExperience, challengesCompleteds } = request.body;



                await collection.insertOne({
                    _id: email,
                    uri_avatar,
                    level,
                    userExperience,
                    challengesCompleteds,
                    createAt: new Date(),
                })

                return response.status(201).json({
                    'userEmail': email,
                    'uri_avatar': uri_avatar,
                    'level': level,
                    'userExperience': userExperience,
                    'challengesCompleteds': challengesCompleteds
                });
                break;

            case 'GET':

                const data = await collection.find().toArray();
                return response.status(201).json(data);

                break;

            case 'PUT':

                return response.status(201).json({
                    'PUT': 'true'
                });
                break;
            default:
                return response.status(405).json({
                    'error': `method ${method} not supported`
                })
        }
    } catch (err) {
        response.status(500).json({
            statusCode: 500, message: err.message
        })
    }

}