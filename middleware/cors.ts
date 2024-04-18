
import { NextRequest, NextResponse } from 'next/server';
import Cors from 'cors'

const corsGet = Cors({
  methods: ['GET', 'HEAD'],
});

export function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default corsGet;