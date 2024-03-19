import { EnvironmentType } from './type';

export default () => ({
    environment: process.env.ENVIRONMENT as EnvironmentType,
    port: parseInt(process.env.APP_PORT, 10),
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
});
