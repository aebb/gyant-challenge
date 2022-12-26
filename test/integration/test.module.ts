import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CasesModule } from '../../src/cases/cases.module';
import { UsersModule } from '../../src/users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test',
    }),
    CasesModule,
    UsersModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: (await MongoMemoryServer.create()).getUri(),
        dbName: String(process.env.DATABASE_NAME),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [],
})

export class TestModule {

}
