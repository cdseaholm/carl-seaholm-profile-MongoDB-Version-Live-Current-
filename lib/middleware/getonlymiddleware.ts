import Cors from 'cors';
import initMiddleware from '@/lib/middleware/middleware';


export const getOnlyCors = initMiddleware(
    Cors({
      methods: ['GET', 'OPTIONS'],
    })
  )