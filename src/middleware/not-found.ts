import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response) => res.status(404).send('Route does not exsist');

export default notFoundMiddleware;
