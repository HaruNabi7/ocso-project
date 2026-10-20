import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { JwtModule } from '@nestjs/jwt';
const JWT_KEY = process.env.JWT_KEY ?? 'development-secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: (EXPIRES_IN as any),
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}