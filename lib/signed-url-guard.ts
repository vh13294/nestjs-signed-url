import { Injectable, CanActivate, ExecutionContext, MethodNotAllowedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SignedUrlService } from './signed-url-service.service';

@Injectable()
export class SignedUrlGuard implements CanActivate {
    constructor(
        private readonly signedUrlService: SignedUrlService,
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(request: any): boolean {
        if(!request.headers.host) {
            throw new MethodNotAllowedException('Unable to derive host name from request')
        }

        return this.signedUrlService.isSignatureValid(
            request.headers.host,
            request._parsedUrl.pathname,
            request.query,
        )
    }
}