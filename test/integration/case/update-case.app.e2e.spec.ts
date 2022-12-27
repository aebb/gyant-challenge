import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {TestModule} from "../test.module";
import {User} from "../../../src/users/entity/user";
import {Role} from "../../../src/users/entity/user.role";
import {UserRepositoryMongo} from "../../../src/users/repository/user.repository.mongo";
import {Case} from "../../../src/cases/entity/case";
import {CaseRepositoryMongo} from "../../../src/cases/repository/case.repository.mongo";
import {Condition} from "../../../src/cases/entity/condition";
import {ConditionRepositoryMongo} from "../../../src/cases/repository/condition.repository.mongo";

describe('CaseController (e2e) /case/:id', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            transform: true,
            whitelist: true,
            validateCustomDecorators: true,
        }));

        await app.init();
    });

    it('/case/:id no credentials', async function () {
        await request(app.getHttpServer())
            .patch('/case/1')
            .expect(401);

    });

    it('/case/:id case no access', async function () {
        const doctor = new User(
            {
                email: 'House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.User]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

       await request(app.getHttpServer())
            .patch('/case/1')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(403);
    });

    it('/case/:id bad request', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        await request(app.getHttpServer())
            .patch('/case/1')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(400);
    });

    it('/case/:id bad request', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        await request(app.getHttpServer())
            .patch('/case/1')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .expect(400);
    });

    it('/case/:id not found', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        const result = await request(app.getHttpServer())
            .patch('/case/63a86292032d370394a3a24c')
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .send({conditionId: "63a86d89032d370394a3a24f", timeToLabel: 50,})
            .expect(404);

        expect(result.body.message).toBe('Case not found');
    });

    it('/case/:id closed', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        let condition = new Condition({code: 'A1', description: 'A description'});
        condition = await moduleRef.get<ConditionRepositoryMongo>(ConditionRepositoryMongo).create(condition);

        let medicalCase = new Case({electronicHealthRecord: 'Lupus', condition: condition});
        medicalCase = await moduleRef.get<CaseRepositoryMongo>(CaseRepositoryMongo).create(medicalCase);

        const result = await request(app.getHttpServer())
            .patch('/case/' +medicalCase.getId())
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .send({conditionId: condition.getId(), timeToLabel: 50,})
            .expect(409);

        expect(result.body.message).toBe('Case is already labeled');
    });

    it('/case/:id condition not found', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        let medicalCase = new Case({electronicHealthRecord: 'Lupus'});
        medicalCase = await moduleRef.get<CaseRepositoryMongo>(CaseRepositoryMongo).create(medicalCase);

        const result = await request(app.getHttpServer())
            .patch('/case/' +medicalCase.getId())
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .send({conditionId: "63a86d89032d370394a3a24f", timeToLabel: 50,})
            .expect(404);

        expect(result.body.message).toBe('Condition not found');
    });

    it('/case/:id updated', async function () {
        const doctor = new User(
            {
                email: 'Dr.House',
                password: '$2a$10$IU/lfvmRghFq6WqP1RPf7uFEObj7Zra7U3dH81Z.eNjeA7TYzYTOK',
                roles: [Role.Doctor]
            }
        );
        await moduleRef.get<UserRepositoryMongo>(UserRepositoryMongo).create(doctor);

        let condition = new Condition({code: 'A1', description: 'A description'});
        condition = await moduleRef.get<ConditionRepositoryMongo>(ConditionRepositoryMongo).create(condition);

        let medicalCase = new Case({electronicHealthRecord: 'Lupus'});
        medicalCase = await moduleRef.get<CaseRepositoryMongo>(CaseRepositoryMongo).create(medicalCase);

        const result = await request(app.getHttpServer())
            .patch('/case/' +medicalCase.getId())
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyLkhvdXNlIiwiaWF0IjoxNjcyMDkzOTAwLCJleHAiOjE2NzIwOTc1MDB9.E0RvwcUC5GU6IPDIvfR-kLXdmF6IKu51x7xFl623vJc'})
            .send({conditionId: condition.getId(), timeToLabel: 50,})
            .expect(200);


        expect(result.body._id).toBe(medicalCase.getId());
        expect(result.body.electronicHealthRecord).toBe('Lupus');
        expect(result.body.doctor).toBe('Dr.House');
        expect(result.body.condition).toBe('A1');
        expect(result.body.timeToLabel).toBe(50);
    });
});
