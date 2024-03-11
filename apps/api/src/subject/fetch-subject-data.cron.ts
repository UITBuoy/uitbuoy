import axios from 'axios';

export class FetchSubjectData {
    static async fetch() {
        const response = await axios.get(
            'https://student.uit.edu.vn/danh-muc-mon-hoc-dai-hoc',
        );

        const html = response.data;

        console.log({ html });
    }
}
