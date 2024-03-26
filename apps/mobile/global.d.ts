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

declare type CourseEntity = {
    categoryid?: any;
    categoryname?: string;
    coursecategory?: string;
    courseimage?: string;
    enddate?: number;
    enrollmentmethods?: any;
    fullname?: string;
    display_name?: string;
    hiddenbynumsections?: any;
    id?: number;
    idnumber?: string;
    name?: string;
    overviewfiles?: any;
    pdfexportfont?: string;
    section?: any;
    shortname?: string;
    showactivitydates?: boolean;
    showcompletionconditions?: any;
    sortorder?: any;
    startdate?: number;
    summary?: string;
    summaryfiles?: any;
    summaryformat?: number;
    uservisible?: boolean;
    viewurl?: string;
    visible?: boolean;
};
