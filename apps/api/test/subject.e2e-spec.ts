import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { SubjectService } from '../src/subject/subject.service';

describe('Subject (e2e)', () => {
    let app: INestApplication;
    let subjectService: SubjectService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        
        subjectService = moduleFixture.get<SubjectService>(SubjectService);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Get Subject', () => {
        it('should get a subject', async () => {
        });
    });
});