import { Injectable } from '@nestjs/common';
import { ApiService } from '../../api/services/api.service';

@Injectable()
export class SubjectApiService {
    constructor(private readonly apiService: ApiService) {}
}
