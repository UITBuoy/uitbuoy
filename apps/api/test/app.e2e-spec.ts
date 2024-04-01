import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // const dataSource = app.get(DataSource);
        // await dataSource.synchronize(true);
        await app.init();
    });

    // afterAll(async () => {
    //     const dataSource = app.get(DataSource);
    //     if (dataSource) {
    //         await dataSource.dropDatabase();
    //         await dataSource.destroy();
    //     }
    //     await app.close();
    // });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
