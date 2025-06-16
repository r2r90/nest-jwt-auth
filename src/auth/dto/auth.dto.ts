import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'qsjdhqjshsqddsq.37383JN?DJD?DNKklsdqqds....',
  })
  accessToken: string;
}
