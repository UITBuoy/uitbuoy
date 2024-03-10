import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    // change me -> create a module for call API

    const response = await axios.get(
      'https://courses.uit.edu.vn/webservice/rest/server.php',
      {
        params: {
          wsfunction: 'core_user_get_users_by_field',
          wstoken: '8463bd24636b1153a7c2a0bc5788369e',
          moodlewsrestformat: 'json',
          field: 'username',
          'values[0]': username,
        },
      },
    );
    const data = response.data;
    if (data.length == 0) {
      throw new Error('User not found');
    }
    return data[0];
  }
}
