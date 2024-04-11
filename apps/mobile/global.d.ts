/// <reference types="nativewind/types" />

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

declare type AuthEntity = {
    access_token: string;
    auth?: string;
    city?: string;
    confirmed?: string;
    country?: string;
    department?: string;
    email?: string;
    firstaccess?: number;
    fullname: string;
    id?: number;
    lang?: string;
    lastaccess?: number;
    mailformat?: string;
    profileimageurl?: string;
    profileimageurlsmall?: string;
    suspended?: string;
    theme?: string;
    timezone?: string;
    token?: string;
    username: string;
};
