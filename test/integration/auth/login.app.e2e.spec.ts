import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {TestModule} from "../test.module";
import {User} from "../../../src/users/entity/user";
import {Role} from "../../../src/users/entity/user.role";
import {UserRepositoryMongo} from "../../../src/users/repository/user.repository.mongo";

describe('AuthController (e2e) /signin', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();
        app = moduleRef.createNestApplication();

        await app.init();
    });

    it('/login no credentials', async function () {
        await request(app.getHttpServer())
            .post('/signin')
            .expect(401);
    });

    it('/login fake credentials', async function () {
        await request(app.getHttpServer())
            .post('/signin')
            .send({email: 'Dr.House', password: 'Lupus'})
            .expect(401);
    });

    it('/login success', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        const result = await request(app.getHttpServer())
            .post('/signin')
            .send({email: 'Dr.House', password: 'banana'})
            .expect(200);

        expect(result.body.accessToken).toBeDefined();
    });

});
