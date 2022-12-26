import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {TestModule} from "../test.module";
import {User} from "../../../src/users/entity/user";
import {Role} from "../../../src/users/entity/user.role";
import {UserRepositoryMongo} from "../../../src/users/repository/user.repository.mongo";
import {Case} from "../../../src/cases/entity/case";
import {CaseRepositoryMongo} from "../../../src/cases/repository/case.repository.mongo";

describe('CaseController (e2e) /case/open', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();
        app = moduleRef.createNestApplication();

        await app.init();
    });

    it('/case/open no credentials', async function () {
        await request(app.getHttpServer())
            .get('/case/open')
            .expect(401);

    });

    it('/case/open case no access', async function () {
        const doctor = new User(
            {
                email: 'House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.User]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

       await request(app.getHttpServer())
            .get('/case/open')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(403);
    });

    it('/case/open case no cases left', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        await request(app.getHttpServer())
            .get('/case/open')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(404);
    });

    it('/case/open success', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        const medicalCase = new Case(
            {
                electronicHealthRecord: 'Description'
            }
        );
        await moduleRef.get<CaseRepositoryMongo>(CaseRepositoryMongo).create(medicalCase);

        await request(app.getHttpServer())
            .get('/case/open')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(200);
    });

});
