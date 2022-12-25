import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { User, UserSchema } from './entity/user';
import { UserRepositoryMongo } from './repository/user.repository.mongo';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: String(process.env.JWT_SECRET),
        signOptions: { expiresIn: String(process.env.JWT_TTL) },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserRepositoryMongo,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryMongo,
    },
    {
      provide: 'JWTSecret',
      useValue: String(process.env.JWT_SECRET),
    },
    {
      provide: 'IgnoreTTL',
      useValue: Boolean(process.env.IGNORE_TTL),
    },
  ],
})
export class UsersModule {}
