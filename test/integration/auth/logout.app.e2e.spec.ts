import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {TestModule} from "../test.module";

describe('AuthController (e2e) /signout', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();
        app = moduleRef.createNestApplication();

        await app.init();
    });

    it('/logout', async function () {
        await request(app.getHttpServer())
            .get('/signout')
            .expect(200);
    });

});
