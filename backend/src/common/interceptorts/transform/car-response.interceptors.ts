import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  interface Response<T> {
    data: T;
  }
  
  @Injectable()
  export class CarResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          data,
          meta: {
            page: data.meta.page,
            take: data.meta.take,
            itemCount: data.meta.itemCount,
            pageCount: data.meta.pageCount,
            hasNextPage: data.meta.hasNextPage,
            hasPreviousPage: data.meta.hasPreviousPage,
          },
        })),
      );
    }
  }