import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('JWT AUTH NESTJS')
    .setDescription('NEST JS REST API AUTH ')
    .setVersion('1.0.0')
    .setContact('r2r90 Team', 'https://github.com/r2r90', 'aghartur@gmail.com')
    .addBearerAuth()
    .build();
}
