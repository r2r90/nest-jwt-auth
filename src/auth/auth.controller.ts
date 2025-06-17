import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/auth.decorator';
import { Authorized } from './decorators/authorizated.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Account Registration',
    description: 'Create a new account',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid Credentials' })
  @ApiConflictResponse({ description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Account Login',
    description: 'Log in user and return access token',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid Credentials' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Refresh Token',
    description: ' check refresh token , Create a new access token',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Refresh token not valid!' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Exit from the app',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized() user: User) {
    return user;
  }
}
