import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';

// Option 1: Incorrect Way
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }

// Option 2: Correct way
declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: User;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      req.currentUser = user;
    }
    next();
  }
}
