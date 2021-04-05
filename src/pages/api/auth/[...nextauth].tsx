import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from 'next'
const options = {
  
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
  ],
  debug: false
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>NextAuth(req, res,options);