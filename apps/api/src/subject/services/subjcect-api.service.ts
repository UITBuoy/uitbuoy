import { Injectable } from '@nestjs/common';
import WS_FUNCTION from 'src/common/constants/function-name';
import { SubjectNotFoundException } from 'src/subject/services/errors/not-found.error';
import { ApiService } from '../../api/services/api.service';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class SubjectApiService {
    constructor(private readonly apiService: ApiService) {}
}
