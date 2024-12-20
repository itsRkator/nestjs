import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

type ClassConstructor = new (...args: any[]) => object;

// Alternate and concise for the above type
// interface ClassConstructor {
//   new (...args: any[]): object;
// }

export const Serialize = (inputDto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(inputDto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly responseDto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.responseDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
