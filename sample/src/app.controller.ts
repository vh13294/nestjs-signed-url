import { Controller, Get, UseGuards } from '@nestjs/common';
import { SignedUrlGuard, SignedUrlService } from 'nestjs-signed-url';

@Controller()
export class AppController {
  constructor(
    private readonly signedUrlService: SignedUrlService,
  ) { }

  @Get()
  getHello(): string {
    return 'hello world'
  }

  @Get('emailVerification')
  @UseGuards(SignedUrlGuard)
  async emailVerification(): Promise<string> {
    return '123'
  }

  @Get('makeSignedUrl')
  async makeSignedUrl(): Promise<string> {
    const params = {
      id: 1,
      reset: false,
      // signed: 2,
    }
    const signedUrl = this.signedUrlService.signedControllerRoute(
      AppController,
      AppController.prototype.emailVerification,
      new Date('2021-12-12'),
      params
    )
    return signedUrl
  }
}
