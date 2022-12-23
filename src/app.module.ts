import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';

const ENV = process.env.NODE_ENV ?? 'dev';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENV}`,
    }),
    CasesModule,
    UsersModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: String(process.env.DATABASE_URL),
        dbName: String(process.env.DATABASE_NAME),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
