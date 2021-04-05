import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDataBase } from '../../utils/mongodb';

export default async (request: VercelRequest, response: VercelResponse) => {

    const { db } = await connectToDataBase();
    const collection = db.collection('users');

    try {

        const { method } = request;

        switch (method) {
            case 'POST':
                const { 
                    email, 
                    name, 
                    uri_avatar, 
                    level, 
                    userExperience, 
                    challengesCompleteds
                } = request.body;

                await collection.insertOne({
                    _id: email,
                    name: name,
                    uri_avatar: uri_avatar,
                    level: level,
                    userExperience: userExperience,
                    challengesCompleteds: challengesCompleteds,
                    createAt: new Date(),
                })

                response.status(201).json({
                    'userEmail': email,
                    'name': name,
                    'uri_avatar': uri_avatar,
                    'level': level,
                    'userExperience': userExperience,
                    'challengesCompleteds': challengesCompleteds
                });
                break;

            case 'GET':

                const data = await collection.find().toArray();
                response.status(201).json(data);

                break;

            case 'PUT':

                const res = request.body;

                let upData = await collection.findOneAndUpdate({
                    _id: res.email,
                }, {
                    $set: {
                        level: res.level,
                        userExperience: res.userExperience,
                        challengesCompleteds: res.challengesCompleteds
                    }
                }, {
                    upsert: false
                });

                response.status(201).json({"data": upData});
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