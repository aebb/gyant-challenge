import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { User, UserSchema } from './entity/user';
import { UserRepositoryMongo } from './repository/user.repository.mongo';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './utils/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    UserRepositoryMongo,
    AuthService,
    LocalStrategy,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryMongo,
    },
  ],
})
export class UsersModule {}
