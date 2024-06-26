import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Assignment = {
  __typename?: 'Assignment';
  /** Start date of the assignment (Must multiply by 1000 to convert to date) */
  allowsubmissionsfromdate?: Maybe<Scalars['Float']['output']>;
  /** Used this id to find in course/assignment */
  cmid?: Maybe<Scalars['Int']['output']>;
  /** Course detail information */
  course?: Maybe<Scalars['Int']['output']>;
  /** Deadline of the assignment (Must multiply by 1000 to convert to date) */
  duedate?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Description about the assignment */
  intro?: Maybe<Scalars['String']['output']>;
  /** Attachment files (has the same object structure as introfiles) */
  introattachments?: Maybe<Array<IntroFile>>;
  /** Files in the description */
  introfiles?: Maybe<Array<IntroFile>>;
  /** Title of the assignment */
  name?: Maybe<Scalars['String']['output']>;
  /** Modified time (Must multiply by 1000 to convert to date) */
  timemodified?: Maybe<Scalars['Float']['output']>;
};

export type AuthEntity = {
  __typename?: 'AuthEntity';
  accessTokenExpiredDate?: Maybe<Scalars['Date']['output']>;
  access_token: Scalars['String']['output'];
  auth?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  confirmed?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstaccess?: Maybe<Scalars['Int']['output']>;
  fullname: Scalars['String']['output'];
  googleUsers: Array<GoogleUser>;
  id?: Maybe<Scalars['Int']['output']>;
  isFirstTimeLogin?: Maybe<Scalars['Boolean']['output']>;
  isIntegrateWithGoogle?: Maybe<Scalars['Boolean']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  lastaccess?: Maybe<Scalars['Int']['output']>;
  mailformat?: Maybe<Scalars['String']['output']>;
  /** Major's fullname of current user */
  majorName: Scalars['String']['output'];
  preferences: Array<UserPreference>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiredDate?: Maybe<Scalars['Date']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  /** Current semester of the user */
  semester: Scalars['Int']['output'];
  suspended?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
  /** Entrance year of current user */
  year: Scalars['String']['output'];
};

export type Calendar = {
  __typename?: 'Calendar';
  id: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Course = {
  __typename?: 'Course';
  /** Find detail information of a specific assignment of the course */
  assignment: Assignment;
  /** All assignments of the current course */
  assignments: Array<Assignment>;
  categoryid?: Maybe<Scalars['Int']['output']>;
  categoryname?: Maybe<Scalars['String']['output']>;
  /** Information of the lecturer */
  contacts: Array<Lecturer>;
  /** Get all content section (i.e. "Giới thiệu chung", "Chương 1") */
  contentSections: Array<CourseSectionEntity>;
  /** Category of the current course (i.e. "Khoa Công Nghệ Phần Mềm", "Môn chung", "2023 - 2024 - 2nd Term") */
  coursecategory?: Maybe<Scalars['String']['output']>;
  /** Image of the course (base64 string) */
  courseimage?: Maybe<Scalars['String']['output']>;
  /** Only return the course name (i.e. "Kiến trúc phần mềm") */
  display_name?: Maybe<Scalars['String']['output']>;
  /** Start date of the course (Must multiply by 1000 to convert to date) */
  enddate?: Maybe<Scalars['Int']['output']>;
  /** All events of the current course */
  events: Array<EventEntity>;
  /** Include course name and course id (i.e. Kiến trúc phần mềm - SE346.PMCL) */
  fullname?: Maybe<Scalars['String']['output']>;
  hiddenbynumsections?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Course id (i.e. SE346.PMCL) */
  idnumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pdfexportfont?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['Int']['output']>;
  /** Course id (i.e. SE346.PMCL) */
  shortname?: Maybe<Scalars['String']['output']>;
  showactivitydates?: Maybe<Scalars['Boolean']['output']>;
  showcompletionconditions?: Maybe<Scalars['String']['output']>;
  sortorder?: Maybe<Scalars['Int']['output']>;
  /** Start date of the course (Must multiply by 1000 to convert to date) */
  startdate?: Maybe<Scalars['Int']['output']>;
  /** Description of the course */
  summary?: Maybe<Scalars['String']['output']>;
  summaryformat?: Maybe<Scalars['Int']['output']>;
  uservisible?: Maybe<Scalars['Boolean']['output']>;
  /** Url to the link of the course in Moodle web */
  viewurl?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};


export type CourseAssignmentArgs = {
  cmid: Scalars['Int']['input'];
};


export type CourseEventsArgs = {
  isComing?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CourseContentEntity = {
  __typename?: 'CourseContentEntity';
  /** Name of the author */
  author?: Maybe<Scalars['String']['output']>;
  /** Name of the file */
  filename?: Maybe<Scalars['String']['output']>;
  /** Path of the file, use it to display in a tree folder view */
  filepath?: Maybe<Scalars['String']['output']>;
  /** File size in byte */
  filesize?: Maybe<Scalars['String']['output']>;
  /** URL to download the file (Must add "token" in the query params with value of the moodle user's token to access the file) */
  fileurl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** Order to sort */
  sortorder?: Maybe<Scalars['String']['output']>;
  /** Created time (Must multiply by 1000 to convert to date) */
  timecreated?: Maybe<Scalars['String']['output']>;
  /** Modified time (Must multiply by 1000 to convert to date) */
  timemodified?: Maybe<Scalars['String']['output']>;
  /** Type of the file ("file" or "url") */
  type?: Maybe<Scalars['String']['output']>;
  userid?: Maybe<Scalars['String']['output']>;
};

export type CourseModuleEntity = {
  __typename?: 'CourseModuleEntity';
  afterlink?: Maybe<Scalars['String']['output']>;
  assignDueDate?: Maybe<Scalars['Int']['output']>;
  assignOpenedDate?: Maybe<Scalars['Int']['output']>;
  completion?: Maybe<Scalars['Int']['output']>;
  completionnotify?: Maybe<Scalars['Int']['output']>;
  contextid?: Maybe<Scalars['Int']['output']>;
  course?: Maybe<Scalars['Int']['output']>;
  /** All files/contents in the current module */
  courseContents?: Maybe<Array<CourseContentEntity>>;
  customdata?: Maybe<Scalars['String']['output']>;
  defaultgroupingid?: Maybe<Scalars['Int']['output']>;
  /** Summary of the module or the description about a deadline */
  description?: Maybe<Scalars['String']['output']>;
  downloadcontent?: Maybe<Scalars['Int']['output']>;
  enablecompletion?: Maybe<Scalars['Int']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  groupingid?: Maybe<Scalars['Int']['output']>;
  groupmode?: Maybe<Scalars['Int']['output']>;
  groupmodeforce?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  indent?: Maybe<Scalars['Int']['output']>;
  instance?: Maybe<Scalars['Int']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  maxbytes?: Maybe<Scalars['Int']['output']>;
  modicon?: Maybe<Scalars['String']['output']>;
  /** Type of the module (i.e. "forum" for notification, "url" for link, "assign" for assignment, "label" for text, "resource" for document) */
  modname: Scalars['String']['output'];
  /** Type of the module in Vietnamese, used to display in the UI */
  modplural?: Maybe<Scalars['String']['output']>;
  module?: Maybe<Scalars['Int']['output']>;
  /** Name of the module */
  name: Scalars['String']['output'];
  newsitems?: Maybe<Scalars['Int']['output']>;
  noviewlink?: Maybe<Scalars['Boolean']['output']>;
  onclick?: Maybe<Scalars['String']['output']>;
  sectionnum?: Maybe<Scalars['Int']['output']>;
  showgrades?: Maybe<Scalars['Int']['output']>;
  showreports?: Maybe<Scalars['Int']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  /** Url to link to the Moodle Web */
  url?: Maybe<Scalars['String']['output']>;
  uservisible?: Maybe<Scalars['Boolean']['output']>;
  visible?: Maybe<Scalars['Int']['output']>;
  visibleoncoursepage?: Maybe<Scalars['Int']['output']>;
};

export type CourseSectionEntity = {
  __typename?: 'CourseSectionEntity';
  /** Subitems of the course section */
  courseModules: Array<CourseModuleEntity>;
  hiddenbynumsections?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** Name of the section (i.e. "General", "Chương 1") */
  name: Scalars['String']['output'];
  /** Section order */
  section?: Maybe<Scalars['Int']['output']>;
  /** Basic summary about the section */
  summary?: Maybe<Scalars['String']['output']>;
  summaryformat?: Maybe<Scalars['Int']['output']>;
  uservisible?: Maybe<Scalars['Boolean']['output']>;
  visible?: Maybe<Scalars['Int']['output']>;
};

export type CreateGoogleUserInput = {
  email: Scalars['String']['input'];
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  photo: Scalars['String']['input'];
  taskListId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNoteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  event_id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type EducationProgram = {
  __typename?: 'EducationProgram';
  knowledgeBlocks: Array<Section>;
  link?: Maybe<Scalars['String']['output']>;
  majorName: Scalars['String']['output'];
  sections: Array<Section>;
  semesterNum: Scalars['Int']['output'];
  totalCredit: Scalars['Int']['output'];
  trainingSystem?: Maybe<Scalars['String']['output']>;
  year: Scalars['String']['output'];
};

export type ElectiveSubjectsArgs = {
  /** The keyword to get suitable subject codes */
  credits?: InputMaybe<Scalars['String']['input']>;
  /** The keyword to get suitable subject codes */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ElectiveSubjectsResult = {
  __typename?: 'ElectiveSubjectsResult';
  codes: Array<Scalars['String']['output']>;
  credits: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EventEntity = {
  __typename?: 'EventEntity';
  /** Title of the event (the main title) */
  activityname?: Maybe<Scalars['String']['output']>;
  /** Short summary about the title (i.e. "Bài tập tới hạn") */
  activitystr?: Maybe<Scalars['String']['output']>;
  candelete?: Maybe<Scalars['Boolean']['output']>;
  canedit?: Maybe<Scalars['Boolean']['output']>;
  categoryid?: Maybe<Scalars['String']['output']>;
  component?: Maybe<Scalars['String']['output']>;
  /** Information of the course of the current event */
  course: Course;
  deleteurl?: Maybe<Scalars['String']['output']>;
  /** Description of the event (Often in HTML format) */
  description?: Maybe<Scalars['String']['output']>;
  editurl?: Maybe<Scalars['String']['output']>;
  eventcount?: Maybe<Scalars['String']['output']>;
  eventtype?: Maybe<Scalars['String']['output']>;
  formattedlocation?: Maybe<Scalars['String']['output']>;
  formattedtime?: Maybe<Scalars['String']['output']>;
  groupid?: Maybe<Scalars['String']['output']>;
  groupname?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  instance?: Maybe<Scalars['Int']['output']>;
  isactionevent?: Maybe<Scalars['Boolean']['output']>;
  iscategoryevent?: Maybe<Scalars['Boolean']['output']>;
  iscourseevent?: Maybe<Scalars['Boolean']['output']>;
  /** Location of the event */
  location?: Maybe<Scalars['String']['output']>;
  /** Type of the event (i.e. "assign" for a assignment) */
  modulename?: Maybe<Scalars['String']['output']>;
  /** Title of the event (Displayed in the calendar) */
  name: Scalars['String']['output'];
  /** i.e. "course" */
  normalisedeventtype?: Maybe<Scalars['String']['output']>;
  /** i.e. "Sự kiện khoá học" */
  normalisedeventtypetext?: Maybe<Scalars['String']['output']>;
  /** Is pass the due */
  overdue?: Maybe<Scalars['Boolean']['output']>;
  /** i.e. "assessment" */
  purpose?: Maybe<Scalars['String']['output']>;
  repeatid?: Maybe<Scalars['String']['output']>;
  timeduration?: Maybe<Scalars['Int']['output']>;
  timemodified?: Maybe<Scalars['Int']['output']>;
  /** Exact deadline time date (Must multiply by 1000 to convert to date) */
  timesort?: Maybe<Scalars['Int']['output']>;
  /** Exact deadline time date (Must multiply by 1000 to convert to date) */
  timestart?: Maybe<Scalars['Int']['output']>;
  /** Deadline time date (Midnight value, not the exact time) (Must multiply by 1000 to convert to date) */
  timeusermidnight?: Maybe<Scalars['Int']['output']>;
  /** Link to the Moodle web */
  url?: Maybe<Scalars['String']['output']>;
  userid?: Maybe<Scalars['Int']['output']>;
  viewurl?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Int']['output']>;
};

export type EventReminder = {
  __typename?: 'EventReminder';
  id: Scalars['Int']['output'];
  /** If true, notify user in mute mode */
  isMute?: Maybe<Scalars['Boolean']['output']>;
  /** Notify user before <minutes> minutes before the due date */
  minutes?: Maybe<Scalars['Int']['output']>;
};

export type EventReminderInput = {
  /** If true, notify user in mute mode */
  isMute?: InputMaybe<Scalars['Boolean']['input']>;
  /** Notify user before <minutes> minutes before the due date */
  minutes?: InputMaybe<Scalars['Int']['input']>;
};

export type GiveLearningPathSubjectCodesResult = {
  __typename?: 'GiveLearningPathSubjectCodesResult';
  electiveSubjects: Array<Scalars['String']['output']>;
  requiredSubjects: Array<Scalars['String']['output']>;
};

export type GoogleCalendarEvent = {
  __typename?: 'GoogleCalendarEvent';
  event: EventEntity;
  googleUser: EventEntity;
  id: Scalars['String']['output'];
  lastSync: Scalars['Float']['output'];
};

export type GoogleUser = {
  __typename?: 'GoogleUser';
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photo: Scalars['String']['output'];
  taskListId?: Maybe<Scalars['String']['output']>;
};

export type IntroFile = {
  __typename?: 'IntroFile';
  /** Name of the file */
  filename?: Maybe<Scalars['String']['output']>;
  /** Path of the file, use it to display in a tree folder view */
  filepath?: Maybe<Scalars['String']['output']>;
  /** Size of the file in byte */
  filesize?: Maybe<Scalars['Int']['output']>;
  /** URL to download the file (Must add "token" in the query params with value of the moodle user's token to access the file) */
  fileurl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** File type */
  mimetype?: Maybe<Scalars['String']['output']>;
  /** Time modified */
  timemodified?: Maybe<Scalars['Int']['output']>;
};

export enum LearningPathOptionEnum {
  ElectiveSubjects = 'electiveSubjects',
  RequiredSubjects = 'requiredSubjects'
}

export type Lecturer = {
  __typename?: 'Lecturer';
  email?: Maybe<Scalars['String']['output']>;
  firstaccess?: Maybe<Scalars['Float']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  lastaccess?: Maybe<Scalars['Float']['output']>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
};

export type MakeUpClass = {
  __typename?: 'MakeUpClass';
  classId: Scalars['String']['output'];
  /** Classroom to learn */
  classroom?: Maybe<Scalars['String']['output']>;
  courseCode: Scalars['String']['output'];
  /** Created date of the make up class notification */
  createdDate: Scalars['Float']['output'];
  /** Tiết kết thúc buổi học */
  end: Scalars['Int']['output'];
  /** Tiết bắt đầu buổi học */
  start: Scalars['Int']['output'];
  /** Ngày học */
  time: Scalars['Float']['output'];
  /** Title of the notification */
  title: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  date: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  receiverId: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add new event reminder */
  addEventReminder: EventReminder;
  addGoogleUser: GoogleUser;
  /** Crawl data for serving news feed */
  crawlAllNewsFeed: Scalars['Boolean']['output'];
  crawlMakeupClass: Scalars['Boolean']['output'];
  createNote: NoteEntity;
  /** Crawl the most recent news */
  dailyCrawlNewsFeed: Scalars['Boolean']['output'];
  findAllEventByCourseIds: Array<Calendar>;
  login: AuthEntity;
  notifyEvents: Scalars['Int']['output'];
  refreshToken: AuthEntity;
  removeNote: Scalars['String']['output'];
  removeNotificationPushToken: Scalars['Boolean']['output'];
  syncEvents: Array<GoogleCalendarEvent>;
  updateNote: Scalars['String']['output'];
  uploadNotificationConfig: NotificationDevice;
};


export type MutationAddEventReminderArgs = {
  event_id: Scalars['Int']['input'];
  reminder: EventReminderInput;
};


export type MutationAddGoogleUserArgs = {
  accessToken: Scalars['String']['input'];
  googleUser: CreateGoogleUserInput;
};


export type MutationCrawlAllNewsFeedArgs = {
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  startPage?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCrawlMakeupClassArgs = {
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  startPage?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateNoteArgs = {
  createNoteInput: CreateNoteInput;
};


export type MutationFindAllEventByCourseIdsArgs = {
  courseids: Array<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveNotificationPushTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationSyncEventsArgs = {
  accessToken: Scalars['String']['input'];
  googleUserId: Scalars['String']['input'];
};


export type MutationUpdateNoteArgs = {
  updateNoteInput: UpdateNoteInput;
};


export type MutationUploadNotificationConfigArgs = {
  config: UpdatedNotificationDevice;
};

export type NewsFeed = {
  __typename?: 'NewsFeed';
  date: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  files: Array<NewsFeedFile>;
  htmlContent: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  plainContent: Scalars['String']['output'];
  tags: Array<NewsFeedTag>;
  title: Scalars['String']['output'];
  view?: Maybe<Scalars['Int']['output']>;
};

export type NewsFeedFile = {
  __typename?: 'NewsFeedFile';
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type NewsFeedTag = {
  __typename?: 'NewsFeedTag';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type NoteEntity = {
  __typename?: 'NoteEntity';
  description?: Maybe<Scalars['String']['output']>;
  event: EventEntity;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type NotificationDevice = {
  __typename?: 'NotificationDevice';
  /** How many days should we notify the user before the event? */
  beforeDay?: Maybe<Scalars['Float']['output']>;
  /** Date of the last notification */
  lastNotificationDate?: Maybe<Scalars['Float']['output']>;
  /** Push token */
  token: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** All assignments of current user */
  assignments: Array<Assignment>;
  /** Get detail information about a specific course */
  course: Course;
  /** Return all education programs of UIT students */
  crawlEducationProgram: Array<EducationProgram>;
  /** Return all subjects of UIT students */
  crawlSubject: Array<Subject>;
  findAll: Array<Subject>;
  findAllEducationProgram: Array<Subject>;
  findOne: Array<Subject>;
  /** Return string array is [class,major] of user */
  findUserMajorByCourse: Array<Scalars['String']['output']>;
  /** Return learning code of elective subjects */
  giveLearningPathSubjectCodes: GiveLearningPathSubjectCodesResult;
  makeUpClass: Array<MakeUpClass>;
  messages: Array<Message>;
  /** Retrieving news feed item */
  newsFeed: Array<NewsFeed>;
  /** Retrieving news feed detail with title */
  newsFeedDetail: NewsFeed;
  note: Array<NoteEntity>;
  profile: User;
  /** Return all elective subjects recommend for user */
  recommendElectiveSubject: Array<ElectiveSubjectsResult>;
  recommendLearningPath: Array<SemesterProgram>;
  /** Return all subjects recommend for user */
  recommendSubject: Array<Subject>;
  rooms: Array<Room>;
  sections: Array<Section>;
  subject?: Maybe<Subject>;
  /** Return all course of current user */
  userCourses: Array<Course>;
  /** Current user's education program */
  userEducationProgram: EducationProgram;
  /** All events of current user */
  userEvents: Array<EventEntity>;
  users: Array<User>;
  year: Scalars['String']['output'];
};


export type QueryCourseArgs = {
  course_id: Scalars['Int']['input'];
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCrawlEducationProgramArgs = {
  years?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryFindAllArgs = {
  nameVN: Scalars['String']['input'];
};


export type QueryFindAllEducationProgramArgs = {
  major: Scalars['String']['input'];
};


export type QueryFindOneArgs = {
  code: Scalars['String']['input'];
};


export type QueryFindUserMajorByCourseArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGiveLearningPathSubjectCodesArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMakeUpClassArgs = {
  courseCode?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Scalars['Float']['input']>;
  inComing?: InputMaybe<Scalars['Boolean']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  year?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryMessagesArgs = {
  id: Scalars['String']['input'];
};


export type QueryNewsFeedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryNewsFeedDetailArgs = {
  title: Scalars['String']['input'];
};


export type QueryNoteArgs = {
  event_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecommendElectiveSubjectArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  options: Array<ElectiveSubjectsArgs>;
};


export type QueryRecommendLearningPathArgs = {
  expectedSemesterNum?: InputMaybe<Scalars['Int']['input']>;
  selectedSubjectCodes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryRecommendSubjectArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  option: LearningPathOptionEnum;
};


export type QuerySubjectArgs = {
  code: Scalars['String']['input'];
};


export type QueryUserCoursesArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserEventsArgs = {
  isComing?: InputMaybe<Scalars['Boolean']['input']>;
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  keyword: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String']['output'];
  lastMessage: Message;
  user: User;
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['String']['output'];
  isOptional?: Maybe<Scalars['Boolean']['output']>;
  learnedCredit: Scalars['Int']['output'];
  minimumCredit?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  subjects: Array<SectionSubject>;
  totalCredit?: Maybe<Scalars['Int']['output']>;
};

export type SectionSubject = {
  __typename?: 'SectionSubject';
  code: Scalars['String']['output'];
  department: Scalars['String']['output'];
  equivalentCode?: Maybe<Scalars['String']['output']>;
  equivalentSubjects: Array<Subject>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isFree?: Maybe<Scalars['Boolean']['output']>;
  isLearned: Scalars['Boolean']['output'];
  isRequired?: Maybe<Scalars['Boolean']['output']>;
  minimumOptionalCredit?: Maybe<Scalars['Int']['output']>;
  nameEN: Scalars['String']['output'];
  nameVN: Scalars['String']['output'];
  oldCode?: Maybe<Scalars['String']['output']>;
  practicalCredit?: Maybe<Scalars['Int']['output']>;
  previousCode?: Maybe<Scalars['String']['output']>;
  previousSubjects: Array<Subject>;
  priority?: Maybe<Scalars['Int']['output']>;
  requiredCode?: Maybe<Scalars['String']['output']>;
  requiredSubjects: Array<Subject>;
  summary?: Maybe<Scalars['String']['output']>;
  theoreticalCredit?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SemesterProgram = {
  __typename?: 'SemesterProgram';
  index: Scalars['Int']['output'];
  subjects: Array<Subject>;
};

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['String']['output'];
  department: Scalars['String']['output'];
  equivalentCode?: Maybe<Scalars['String']['output']>;
  equivalentSubjects: Array<Subject>;
  isActive: Scalars['Boolean']['output'];
  isLearned: Scalars['Boolean']['output'];
  nameEN: Scalars['String']['output'];
  nameVN: Scalars['String']['output'];
  oldCode?: Maybe<Scalars['String']['output']>;
  practicalCredit: Scalars['Int']['output'];
  previousCode?: Maybe<Scalars['String']['output']>;
  previousSubjects: Array<Subject>;
  priority?: Maybe<Scalars['Int']['output']>;
  requiredCode?: Maybe<Scalars['String']['output']>;
  requiredSubjects: Array<Subject>;
  summary?: Maybe<Scalars['String']['output']>;
  theoreticalCredit: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type UpdateNoteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatedNotificationDevice = {
  /** How many days should we notify the user before the event? */
  beforeDay?: InputMaybe<Scalars['Float']['input']>;
  /** Push token */
  token: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  auth?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  confirmed?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstaccess?: Maybe<Scalars['Int']['output']>;
  fullname: Scalars['String']['output'];
  googleUsers: Array<GoogleUser>;
  id?: Maybe<Scalars['Int']['output']>;
  isIntegrateWithGoogle?: Maybe<Scalars['Boolean']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  lastaccess?: Maybe<Scalars['Int']['output']>;
  mailformat?: Maybe<Scalars['String']['output']>;
  /** Major's fullname of current user */
  majorName: Scalars['String']['output'];
  preferences: Array<UserPreference>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
  /** Current semester of the user */
  semester: Scalars['Int']['output'];
  suspended?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
  /** Entrance year of current user */
  year: Scalars['String']['output'];
};

export type UserPreference = {
  __typename?: 'UserPreference';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AddGoogleUserMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
  googleUser: CreateGoogleUserInput;
}>;


export type AddGoogleUserMutation = { __typename?: 'Mutation', addGoogleUser: { __typename?: 'GoogleUser', email: string, familyName: string, givenName: string, id: string, name: string, photo: string, taskListId?: string | null } };

export type LoginApiMutationVariables = Exact<{
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type LoginApiMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthEntity', access_token: string, refresh_token?: string | null, auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, profileimageurl?: string | null, profileimageurlsmall?: string | null, suspended?: string | null, theme?: string | null, timezone?: string | null, token: string, username: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, isIntegrateWithGoogle?: boolean | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, profileimageurl?: string | null, profileimageurlsmall?: string | null, suspended?: string | null, theme?: string | null, timezone?: string | null, token: string, username: string, year: string, majorName: string, semester: number } };

export type MessagesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', content: string, date: number, id: string, receiverId: string, senderId: string }> };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'Room', id: string, lastMessage: { __typename?: 'Message', content: string, date: number, id: string, receiverId: string, senderId: string }, user: { __typename?: 'User', auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, isIntegrateWithGoogle?: boolean | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, majorName: string, profileimageurl?: string | null, profileimageurlsmall?: string | null, semester: number, suspended?: string | null, theme?: string | null, timezone?: string | null, token: string, username: string, year: string } }> };

export type UploadNotificationConfigMutationVariables = Exact<{
  beforeDay?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
}>;


export type UploadNotificationConfigMutation = { __typename?: 'Mutation', uploadNotificationConfig: { __typename?: 'NotificationDevice', beforeDay?: number | null, lastNotificationDate?: number | null, token: string } };

export type DetailAssignmentCourseQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  assignment_id: Scalars['Int']['input'];
}>;


export type DetailAssignmentCourseQuery = { __typename?: 'Query', assignmentCourse: { __typename?: 'Course', display_name?: string | null, fullname?: string | null, id?: number | null, shortname?: string | null, assignment: { __typename?: 'Assignment', allowsubmissionsfromdate?: number | null, cmid?: number | null, course?: number | null, duedate?: number | null, id?: number | null, intro?: string | null, name?: string | null, timemodified?: number | null, introattachments?: Array<{ __typename?: 'IntroFile', filename?: string | null, filepath?: string | null, filesize?: number | null, fileurl?: string | null, id?: string | null, mimetype?: string | null, timemodified?: number | null }> | null, introfiles?: Array<{ __typename?: 'IntroFile', filename?: string | null, filepath?: string | null, filesize?: number | null, fileurl?: string | null, id?: string | null, mimetype?: string | null, timemodified?: number | null }> | null } } };

export type GeneralDetailCourseQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GeneralDetailCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', coursecategory?: string | null, courseimage?: string | null, display_name?: string | null, enddate?: number | null, fullname?: string | null, id?: number | null, idnumber?: string | null, name?: string | null, section?: number | null, shortname?: string | null, startdate?: number | null, contacts: Array<{ __typename?: 'Lecturer', fullname?: string | null, id: number }>, assignments: Array<{ __typename?: 'Assignment', allowsubmissionsfromdate?: number | null, cmid?: number | null, course?: number | null, duedate?: number | null, id?: number | null, intro?: string | null, name?: string | null, timemodified?: number | null }>, events: Array<{ __typename?: 'EventEntity', activityname?: string | null, description?: string | null, id: number, modulename?: string | null, name: string, overdue?: boolean | null, purpose?: string | null, timestart?: number | null, timeusermidnight?: number | null }>, contentSections: Array<{ __typename?: 'CourseSectionEntity', name: string, section?: number | null, summary?: string | null, id: number, courseModules: Array<{ __typename?: 'CourseModuleEntity', downloadcontent?: number | null, description?: string | null, id: number, modicon?: string | null, modname: string, modplural?: string | null, name: string, url?: string | null, assignOpenedDate?: number | null, assignDueDate?: number | null, courseContents?: Array<{ __typename?: 'CourseContentEntity', author?: string | null, filename?: string | null, filepath?: string | null, filesize?: string | null, fileurl?: string | null, id: number, sortorder?: string | null, timecreated?: string | null, timemodified?: string | null, type?: string | null, userid?: string | null }> | null }> }> } };

export type SearchCoursesQueryVariables = Exact<{
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchCoursesQuery = { __typename?: 'Query', userCourses: Array<{ __typename?: 'Course', coursecategory?: string | null, display_name?: string | null, enddate?: number | null, id?: number | null, shortname?: string | null, startdate?: number | null }> };

export type UserCoursesQueryVariables = Exact<{
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserCoursesQuery = { __typename?: 'Query', userCourses: Array<{ __typename?: 'Course', categoryid?: number | null, categoryname?: string | null, display_name?: string | null, coursecategory?: string | null, courseimage?: string | null, enddate?: number | null, fullname?: string | null, id?: number | null, idnumber?: string | null, name?: string | null, shortname?: string | null, startdate?: number | null }> };

export type UserEventsQueryVariables = Exact<{
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UserEventsQuery = { __typename?: 'Query', userEvents: Array<{ __typename?: 'EventEntity', activityname?: string | null, purpose?: string | null, overdue?: boolean | null, timeduration?: number | null, timeusermidnight?: number | null, timestart?: number | null, timesort?: number | null, timemodified?: number | null, name: string, id: number, instance?: number | null, course: { __typename?: 'Course', categoryid?: number | null, categoryname?: string | null, coursecategory?: string | null, courseimage?: string | null, display_name?: string | null, enddate?: number | null, fullname?: string | null, hiddenbynumsections?: number | null, id?: number | null, idnumber?: string | null, name?: string | null, pdfexportfont?: string | null, section?: number | null, shortname?: string | null, showactivitydates?: boolean | null, showcompletionconditions?: string | null, sortorder?: number | null, startdate?: number | null, uservisible?: boolean | null, viewurl?: string | null, visible?: boolean | null } }> };

export type NewsFeedDetailQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type NewsFeedDetailQuery = { __typename?: 'Query', newsFeedDetail: { __typename?: 'NewsFeed', date: number, description?: string | null, htmlContent: string, imageUrl?: string | null, link: string, plainContent: string, title: string, view?: number | null, tags: Array<{ __typename?: 'NewsFeedTag', description?: string | null, name: string }>, files: Array<{ __typename?: 'NewsFeedFile', title?: string | null, url: string }> } };

export type GeneralNewsFeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GeneralNewsFeedQuery = { __typename?: 'Query', newsFeed: Array<{ __typename?: 'NewsFeed', date: number, description?: string | null, htmlContent: string, imageUrl?: string | null, link: string, plainContent: string, title: string, view?: number | null, tags: Array<{ __typename?: 'NewsFeedTag', description?: string | null, name: string }>, files: Array<{ __typename?: 'NewsFeedFile', title?: string | null, url: string }> }> };

export type SyncEventMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
  googleUserId: Scalars['String']['input'];
}>;


export type SyncEventMutation = { __typename?: 'Mutation', syncEvents: Array<{ __typename?: 'GoogleCalendarEvent', id: string, lastSync: number }> };

export type UserEducationProgramQueryVariables = Exact<{ [key: string]: never; }>;


export type UserEducationProgramQuery = { __typename?: 'Query', userEducationProgram: { __typename?: 'EducationProgram', link?: string | null, majorName: string, totalCredit: number, trainingSystem?: string | null, year: string, sections: Array<{ __typename?: 'Section', id: string, name?: string | null, order?: number | null, totalCredit?: number | null, learnedCredit: number, subjects: Array<{ __typename?: 'SectionSubject', code: string, department: string, equivalentCode?: string | null, id: string, isActive: boolean, isFree?: boolean | null, isRequired?: boolean | null, minimumOptionalCredit?: number | null, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit?: number | null, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit?: number | null, type?: string | null, isLearned: boolean }> }> } };

export type RecommendLearningPathQueryVariables = Exact<{
  expectedSemesterNum?: InputMaybe<Scalars['Int']['input']>;
  selectedSubjectCodes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type RecommendLearningPathQuery = { __typename?: 'Query', recommendLearningPath: Array<{ __typename?: 'SemesterProgram', index: number, subjects: Array<{ __typename?: 'Subject', code: string, department: string, equivalentCode?: string | null, isActive: boolean, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit: number, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit: number, type: string }> }> };

export type UserMakeUpClassQueryVariables = Exact<{ [key: string]: never; }>;


export type UserMakeUpClassQuery = { __typename?: 'Query', makeUpClass: Array<{ __typename?: 'MakeUpClass', classId: string, classroom?: string | null, courseCode: string, createdDate: number, end: number, start: number, time: number, title: string }> };

export type CourseMakeUpClassQueryVariables = Exact<{
  courseCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type CourseMakeUpClassQuery = { __typename?: 'Query', makeUpClass: Array<{ __typename?: 'MakeUpClass', classId: string, classroom?: string | null, courseCode: string, createdDate: number, end: number, start: number, time: number, title: string }> };

export type SubjectQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type SubjectQuery = { __typename?: 'Query', subject?: { __typename?: 'Subject', code: string, department: string, equivalentCode?: string | null, isActive: boolean, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit: number, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit: number, type: string, equivalentSubjects: Array<{ __typename?: 'Subject', code: string, department: string, equivalentCode?: string | null, isActive: boolean, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit: number, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit: number, type: string }>, previousSubjects: Array<{ __typename?: 'Subject', code: string, department: string, equivalentCode?: string | null, isActive: boolean, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit: number, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit: number, type: string }>, requiredSubjects: Array<{ __typename?: 'Subject', code: string, department: string, equivalentCode?: string | null, isActive: boolean, nameEN: string, nameVN: string, oldCode?: string | null, practicalCredit: number, previousCode?: string | null, requiredCode?: string | null, summary?: string | null, theoreticalCredit: number, type: string }> } | null };

export type SearchUsersQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, username: string, profileimageurlsmall?: string | null, profileimageurl?: string | null }> };


export const AddGoogleUserDocument = gql`
    mutation AddGoogleUser($accessToken: String!, $googleUser: CreateGoogleUserInput!) {
  addGoogleUser(accessToken: $accessToken, googleUser: $googleUser) {
    email
    familyName
    givenName
    id
    name
    photo
    taskListId
  }
}
    `;
export type AddGoogleUserMutationFn = Apollo.MutationFunction<AddGoogleUserMutation, AddGoogleUserMutationVariables>;

/**
 * __useAddGoogleUserMutation__
 *
 * To run a mutation, you first call `useAddGoogleUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGoogleUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGoogleUserMutation, { data, loading, error }] = useAddGoogleUserMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      googleUser: // value for 'googleUser'
 *   },
 * });
 */
export function useAddGoogleUserMutation(baseOptions?: Apollo.MutationHookOptions<AddGoogleUserMutation, AddGoogleUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGoogleUserMutation, AddGoogleUserMutationVariables>(AddGoogleUserDocument, options);
      }
export type AddGoogleUserMutationHookResult = ReturnType<typeof useAddGoogleUserMutation>;
export type AddGoogleUserMutationResult = Apollo.MutationResult<AddGoogleUserMutation>;
export type AddGoogleUserMutationOptions = Apollo.BaseMutationOptions<AddGoogleUserMutation, AddGoogleUserMutationVariables>;
export const LoginApiDocument = gql`
    mutation LoginAPI($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    access_token
    refresh_token
    auth
    city
    confirmed
    country
    department
    email
    firstaccess
    fullname
    id
    lang
    lastaccess
    mailformat
    profileimageurl
    profileimageurlsmall
    suspended
    theme
    timezone
    token
    username
  }
}
    `;
export type LoginApiMutationFn = Apollo.MutationFunction<LoginApiMutation, LoginApiMutationVariables>;

/**
 * __useLoginApiMutation__
 *
 * To run a mutation, you first call `useLoginApiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginApiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginApiMutation, { data, loading, error }] = useLoginApiMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginApiMutation(baseOptions?: Apollo.MutationHookOptions<LoginApiMutation, LoginApiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginApiMutation, LoginApiMutationVariables>(LoginApiDocument, options);
      }
export type LoginApiMutationHookResult = ReturnType<typeof useLoginApiMutation>;
export type LoginApiMutationResult = Apollo.MutationResult<LoginApiMutation>;
export type LoginApiMutationOptions = Apollo.BaseMutationOptions<LoginApiMutation, LoginApiMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    auth
    city
    confirmed
    country
    department
    email
    firstaccess
    fullname
    id
    isIntegrateWithGoogle
    lang
    lastaccess
    mailformat
    profileimageurl
    profileimageurlsmall
    suspended
    theme
    timezone
    token
    username
    year
    majorName
    semester
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export function refetchProfileQuery(variables?: ProfileQueryVariables) {
      return { query: ProfileDocument, variables: variables }
    }
export const MessagesDocument = gql`
    query Messages($id: String!) {
  messages(id: $id) {
    content
    date
    id
    receiverId
    senderId
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables> & ({ variables: MessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export function useMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesSuspenseQueryHookResult = ReturnType<typeof useMessagesSuspenseQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export function refetchMessagesQuery(variables: MessagesQueryVariables) {
      return { query: MessagesDocument, variables: variables }
    }
export const RoomsDocument = gql`
    query Rooms {
  rooms {
    id
    lastMessage {
      content
      date
      id
      receiverId
      senderId
    }
    user {
      auth
      city
      confirmed
      country
      department
      email
      firstaccess
      fullname
      id
      isIntegrateWithGoogle
      lang
      lastaccess
      mailformat
      majorName
      profileimageurl
      profileimageurlsmall
      semester
      suspended
      theme
      timezone
      token
      username
      year
    }
  }
}
    `;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export function useRoomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsSuspenseQueryHookResult = ReturnType<typeof useRoomsSuspenseQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;
export function refetchRoomsQuery(variables?: RoomsQueryVariables) {
      return { query: RoomsDocument, variables: variables }
    }
export const UploadNotificationConfigDocument = gql`
    mutation UploadNotificationConfig($beforeDay: Float, $token: String!) {
  uploadNotificationConfig(config: {beforeDay: $beforeDay, token: $token}) {
    beforeDay
    lastNotificationDate
    token
  }
}
    `;
export type UploadNotificationConfigMutationFn = Apollo.MutationFunction<UploadNotificationConfigMutation, UploadNotificationConfigMutationVariables>;

/**
 * __useUploadNotificationConfigMutation__
 *
 * To run a mutation, you first call `useUploadNotificationConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadNotificationConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadNotificationConfigMutation, { data, loading, error }] = useUploadNotificationConfigMutation({
 *   variables: {
 *      beforeDay: // value for 'beforeDay'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUploadNotificationConfigMutation(baseOptions?: Apollo.MutationHookOptions<UploadNotificationConfigMutation, UploadNotificationConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadNotificationConfigMutation, UploadNotificationConfigMutationVariables>(UploadNotificationConfigDocument, options);
      }
export type UploadNotificationConfigMutationHookResult = ReturnType<typeof useUploadNotificationConfigMutation>;
export type UploadNotificationConfigMutationResult = Apollo.MutationResult<UploadNotificationConfigMutation>;
export type UploadNotificationConfigMutationOptions = Apollo.BaseMutationOptions<UploadNotificationConfigMutation, UploadNotificationConfigMutationVariables>;
export const DetailAssignmentCourseDocument = gql`
    query DetailAssignmentCourse($id: Int!, $assignment_id: Int!) {
  assignmentCourse: course(course_id: $id) {
    display_name
    fullname
    id
    shortname
    assignment(cmid: $assignment_id) {
      allowsubmissionsfromdate
      cmid
      course
      duedate
      id
      intro
      name
      timemodified
      introattachments {
        filename
        filepath
        filesize
        fileurl
        id
        mimetype
        timemodified
      }
      introfiles {
        filename
        filepath
        filesize
        fileurl
        id
        mimetype
        timemodified
      }
    }
  }
}
    `;

/**
 * __useDetailAssignmentCourseQuery__
 *
 * To run a query within a React component, call `useDetailAssignmentCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailAssignmentCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailAssignmentCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *      assignment_id: // value for 'assignment_id'
 *   },
 * });
 */
export function useDetailAssignmentCourseQuery(baseOptions: Apollo.QueryHookOptions<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables> & ({ variables: DetailAssignmentCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>(DetailAssignmentCourseDocument, options);
      }
export function useDetailAssignmentCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>(DetailAssignmentCourseDocument, options);
        }
export function useDetailAssignmentCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>(DetailAssignmentCourseDocument, options);
        }
export type DetailAssignmentCourseQueryHookResult = ReturnType<typeof useDetailAssignmentCourseQuery>;
export type DetailAssignmentCourseLazyQueryHookResult = ReturnType<typeof useDetailAssignmentCourseLazyQuery>;
export type DetailAssignmentCourseSuspenseQueryHookResult = ReturnType<typeof useDetailAssignmentCourseSuspenseQuery>;
export type DetailAssignmentCourseQueryResult = Apollo.QueryResult<DetailAssignmentCourseQuery, DetailAssignmentCourseQueryVariables>;
export function refetchDetailAssignmentCourseQuery(variables: DetailAssignmentCourseQueryVariables) {
      return { query: DetailAssignmentCourseDocument, variables: variables }
    }
export const GeneralDetailCourseDocument = gql`
    query GeneralDetailCourse($id: Int!) {
  course(course_id: $id) {
    coursecategory
    courseimage
    display_name
    enddate
    fullname
    id
    idnumber
    name
    section
    shortname
    startdate
    contacts {
      fullname
      id
    }
    assignments {
      allowsubmissionsfromdate
      cmid
      course
      duedate
      id
      intro
      name
      timemodified
    }
    events {
      activityname
      description
      id
      modulename
      name
      overdue
      purpose
      timestart
      timeusermidnight
    }
    contentSections {
      name
      section
      summary
      id
      courseModules {
        downloadcontent
        description
        id
        modicon
        modname
        modplural
        name
        url
        assignOpenedDate
        assignDueDate
        courseContents {
          author
          filename
          filepath
          filesize
          fileurl
          id
          sortorder
          timecreated
          timemodified
          type
          userid
        }
      }
    }
  }
}
    `;

/**
 * __useGeneralDetailCourseQuery__
 *
 * To run a query within a React component, call `useGeneralDetailCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralDetailCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralDetailCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGeneralDetailCourseQuery(baseOptions: Apollo.QueryHookOptions<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables> & ({ variables: GeneralDetailCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>(GeneralDetailCourseDocument, options);
      }
export function useGeneralDetailCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>(GeneralDetailCourseDocument, options);
        }
export function useGeneralDetailCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>(GeneralDetailCourseDocument, options);
        }
export type GeneralDetailCourseQueryHookResult = ReturnType<typeof useGeneralDetailCourseQuery>;
export type GeneralDetailCourseLazyQueryHookResult = ReturnType<typeof useGeneralDetailCourseLazyQuery>;
export type GeneralDetailCourseSuspenseQueryHookResult = ReturnType<typeof useGeneralDetailCourseSuspenseQuery>;
export type GeneralDetailCourseQueryResult = Apollo.QueryResult<GeneralDetailCourseQuery, GeneralDetailCourseQueryVariables>;
export function refetchGeneralDetailCourseQuery(variables: GeneralDetailCourseQueryVariables) {
      return { query: GeneralDetailCourseDocument, variables: variables }
    }
export const SearchCoursesDocument = gql`
    query SearchCourses($isNew: Boolean, $keyword: String, $isRecent: Boolean) {
  userCourses(isNew: $isNew, keyword: $keyword, isRecent: $isRecent) {
    coursecategory
    display_name
    enddate
    id
    shortname
    startdate
  }
}
    `;

/**
 * __useSearchCoursesQuery__
 *
 * To run a query within a React component, call `useSearchCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCoursesQuery({
 *   variables: {
 *      isNew: // value for 'isNew'
 *      keyword: // value for 'keyword'
 *      isRecent: // value for 'isRecent'
 *   },
 * });
 */
export function useSearchCoursesQuery(baseOptions?: Apollo.QueryHookOptions<SearchCoursesQuery, SearchCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCoursesQuery, SearchCoursesQueryVariables>(SearchCoursesDocument, options);
      }
export function useSearchCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCoursesQuery, SearchCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCoursesQuery, SearchCoursesQueryVariables>(SearchCoursesDocument, options);
        }
export function useSearchCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCoursesQuery, SearchCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCoursesQuery, SearchCoursesQueryVariables>(SearchCoursesDocument, options);
        }
export type SearchCoursesQueryHookResult = ReturnType<typeof useSearchCoursesQuery>;
export type SearchCoursesLazyQueryHookResult = ReturnType<typeof useSearchCoursesLazyQuery>;
export type SearchCoursesSuspenseQueryHookResult = ReturnType<typeof useSearchCoursesSuspenseQuery>;
export type SearchCoursesQueryResult = Apollo.QueryResult<SearchCoursesQuery, SearchCoursesQueryVariables>;
export function refetchSearchCoursesQuery(variables?: SearchCoursesQueryVariables) {
      return { query: SearchCoursesDocument, variables: variables }
    }
export const UserCoursesDocument = gql`
    query UserCourses($isNew: Boolean, $isRecent: Boolean, $keyword: String) {
  userCourses(isNew: $isNew, isRecent: $isRecent, keyword: $keyword) {
    categoryid
    categoryname
    display_name
    coursecategory
    courseimage
    enddate
    fullname
    id
    idnumber
    name
    shortname
    startdate
  }
}
    `;

/**
 * __useUserCoursesQuery__
 *
 * To run a query within a React component, call `useUserCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCoursesQuery({
 *   variables: {
 *      isNew: // value for 'isNew'
 *      isRecent: // value for 'isRecent'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useUserCoursesQuery(baseOptions?: Apollo.QueryHookOptions<UserCoursesQuery, UserCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCoursesQuery, UserCoursesQueryVariables>(UserCoursesDocument, options);
      }
export function useUserCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCoursesQuery, UserCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCoursesQuery, UserCoursesQueryVariables>(UserCoursesDocument, options);
        }
export function useUserCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserCoursesQuery, UserCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserCoursesQuery, UserCoursesQueryVariables>(UserCoursesDocument, options);
        }
export type UserCoursesQueryHookResult = ReturnType<typeof useUserCoursesQuery>;
export type UserCoursesLazyQueryHookResult = ReturnType<typeof useUserCoursesLazyQuery>;
export type UserCoursesSuspenseQueryHookResult = ReturnType<typeof useUserCoursesSuspenseQuery>;
export type UserCoursesQueryResult = Apollo.QueryResult<UserCoursesQuery, UserCoursesQueryVariables>;
export function refetchUserCoursesQuery(variables?: UserCoursesQueryVariables) {
      return { query: UserCoursesDocument, variables: variables }
    }
export const UserEventsDocument = gql`
    query UserEvents($isNew: Boolean) {
  userEvents(isNew: $isNew) {
    activityname
    purpose
    overdue
    timeduration
    timeusermidnight
    timestart
    timesort
    timemodified
    name
    id
    instance
    course {
      categoryid
      categoryname
      coursecategory
      courseimage
      display_name
      enddate
      fullname
      hiddenbynumsections
      id
      idnumber
      name
      pdfexportfont
      section
      shortname
      showactivitydates
      showcompletionconditions
      sortorder
      startdate
      uservisible
      viewurl
      visible
    }
  }
}
    `;

/**
 * __useUserEventsQuery__
 *
 * To run a query within a React component, call `useUserEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEventsQuery({
 *   variables: {
 *      isNew: // value for 'isNew'
 *   },
 * });
 */
export function useUserEventsQuery(baseOptions?: Apollo.QueryHookOptions<UserEventsQuery, UserEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEventsQuery, UserEventsQueryVariables>(UserEventsDocument, options);
      }
export function useUserEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEventsQuery, UserEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEventsQuery, UserEventsQueryVariables>(UserEventsDocument, options);
        }
export function useUserEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserEventsQuery, UserEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserEventsQuery, UserEventsQueryVariables>(UserEventsDocument, options);
        }
export type UserEventsQueryHookResult = ReturnType<typeof useUserEventsQuery>;
export type UserEventsLazyQueryHookResult = ReturnType<typeof useUserEventsLazyQuery>;
export type UserEventsSuspenseQueryHookResult = ReturnType<typeof useUserEventsSuspenseQuery>;
export type UserEventsQueryResult = Apollo.QueryResult<UserEventsQuery, UserEventsQueryVariables>;
export function refetchUserEventsQuery(variables?: UserEventsQueryVariables) {
      return { query: UserEventsDocument, variables: variables }
    }
export const NewsFeedDetailDocument = gql`
    query NewsFeedDetail($title: String!) {
  newsFeedDetail(title: $title) {
    date
    description
    htmlContent
    imageUrl
    link
    plainContent
    title
    view
    tags {
      description
      name
    }
    files {
      title
      url
    }
  }
}
    `;

/**
 * __useNewsFeedDetailQuery__
 *
 * To run a query within a React component, call `useNewsFeedDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsFeedDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsFeedDetailQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useNewsFeedDetailQuery(baseOptions: Apollo.QueryHookOptions<NewsFeedDetailQuery, NewsFeedDetailQueryVariables> & ({ variables: NewsFeedDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>(NewsFeedDetailDocument, options);
      }
export function useNewsFeedDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>(NewsFeedDetailDocument, options);
        }
export function useNewsFeedDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>(NewsFeedDetailDocument, options);
        }
export type NewsFeedDetailQueryHookResult = ReturnType<typeof useNewsFeedDetailQuery>;
export type NewsFeedDetailLazyQueryHookResult = ReturnType<typeof useNewsFeedDetailLazyQuery>;
export type NewsFeedDetailSuspenseQueryHookResult = ReturnType<typeof useNewsFeedDetailSuspenseQuery>;
export type NewsFeedDetailQueryResult = Apollo.QueryResult<NewsFeedDetailQuery, NewsFeedDetailQueryVariables>;
export function refetchNewsFeedDetailQuery(variables: NewsFeedDetailQueryVariables) {
      return { query: NewsFeedDetailDocument, variables: variables }
    }
export const GeneralNewsFeedDocument = gql`
    query GeneralNewsFeed($limit: Int, $skip: Int, $tags: [String!]) {
  newsFeed(limit: $limit, skip: $skip, tags: $tags) {
    date
    description
    htmlContent
    imageUrl
    link
    plainContent
    title
    view
    tags {
      description
      name
    }
    files {
      title
      url
    }
  }
}
    `;

/**
 * __useGeneralNewsFeedQuery__
 *
 * To run a query within a React component, call `useGeneralNewsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralNewsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralNewsFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useGeneralNewsFeedQuery(baseOptions?: Apollo.QueryHookOptions<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>(GeneralNewsFeedDocument, options);
      }
export function useGeneralNewsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>(GeneralNewsFeedDocument, options);
        }
export function useGeneralNewsFeedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>(GeneralNewsFeedDocument, options);
        }
export type GeneralNewsFeedQueryHookResult = ReturnType<typeof useGeneralNewsFeedQuery>;
export type GeneralNewsFeedLazyQueryHookResult = ReturnType<typeof useGeneralNewsFeedLazyQuery>;
export type GeneralNewsFeedSuspenseQueryHookResult = ReturnType<typeof useGeneralNewsFeedSuspenseQuery>;
export type GeneralNewsFeedQueryResult = Apollo.QueryResult<GeneralNewsFeedQuery, GeneralNewsFeedQueryVariables>;
export function refetchGeneralNewsFeedQuery(variables?: GeneralNewsFeedQueryVariables) {
      return { query: GeneralNewsFeedDocument, variables: variables }
    }
export const SyncEventDocument = gql`
    mutation SyncEvent($accessToken: String!, $googleUserId: String!) {
  syncEvents(accessToken: $accessToken, googleUserId: $googleUserId) {
    id
    lastSync
  }
}
    `;
export type SyncEventMutationFn = Apollo.MutationFunction<SyncEventMutation, SyncEventMutationVariables>;

/**
 * __useSyncEventMutation__
 *
 * To run a mutation, you first call `useSyncEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncEventMutation, { data, loading, error }] = useSyncEventMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      googleUserId: // value for 'googleUserId'
 *   },
 * });
 */
export function useSyncEventMutation(baseOptions?: Apollo.MutationHookOptions<SyncEventMutation, SyncEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncEventMutation, SyncEventMutationVariables>(SyncEventDocument, options);
      }
export type SyncEventMutationHookResult = ReturnType<typeof useSyncEventMutation>;
export type SyncEventMutationResult = Apollo.MutationResult<SyncEventMutation>;
export type SyncEventMutationOptions = Apollo.BaseMutationOptions<SyncEventMutation, SyncEventMutationVariables>;
export const UserEducationProgramDocument = gql`
    query UserEducationProgram {
  userEducationProgram {
    link
    majorName
    totalCredit
    trainingSystem
    year
    sections {
      id
      name
      order
      totalCredit
      learnedCredit
      subjects {
        code
        department
        equivalentCode
        id
        isActive
        isFree
        isRequired
        minimumOptionalCredit
        nameEN
        nameVN
        oldCode
        practicalCredit
        previousCode
        requiredCode
        summary
        theoreticalCredit
        type
        isLearned
      }
    }
  }
}
    `;

/**
 * __useUserEducationProgramQuery__
 *
 * To run a query within a React component, call `useUserEducationProgramQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEducationProgramQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEducationProgramQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserEducationProgramQuery(baseOptions?: Apollo.QueryHookOptions<UserEducationProgramQuery, UserEducationProgramQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEducationProgramQuery, UserEducationProgramQueryVariables>(UserEducationProgramDocument, options);
      }
export function useUserEducationProgramLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEducationProgramQuery, UserEducationProgramQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEducationProgramQuery, UserEducationProgramQueryVariables>(UserEducationProgramDocument, options);
        }
export function useUserEducationProgramSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserEducationProgramQuery, UserEducationProgramQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserEducationProgramQuery, UserEducationProgramQueryVariables>(UserEducationProgramDocument, options);
        }
export type UserEducationProgramQueryHookResult = ReturnType<typeof useUserEducationProgramQuery>;
export type UserEducationProgramLazyQueryHookResult = ReturnType<typeof useUserEducationProgramLazyQuery>;
export type UserEducationProgramSuspenseQueryHookResult = ReturnType<typeof useUserEducationProgramSuspenseQuery>;
export type UserEducationProgramQueryResult = Apollo.QueryResult<UserEducationProgramQuery, UserEducationProgramQueryVariables>;
export function refetchUserEducationProgramQuery(variables?: UserEducationProgramQueryVariables) {
      return { query: UserEducationProgramDocument, variables: variables }
    }
export const RecommendLearningPathDocument = gql`
    query RecommendLearningPath($expectedSemesterNum: Int, $selectedSubjectCodes: [String!]) {
  recommendLearningPath(
    expectedSemesterNum: $expectedSemesterNum
    selectedSubjectCodes: $selectedSubjectCodes
  ) {
    index
    subjects {
      code
      department
      equivalentCode
      isActive
      nameEN
      nameVN
      oldCode
      practicalCredit
      previousCode
      requiredCode
      summary
      theoreticalCredit
      type
    }
  }
}
    `;

/**
 * __useRecommendLearningPathQuery__
 *
 * To run a query within a React component, call `useRecommendLearningPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendLearningPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendLearningPathQuery({
 *   variables: {
 *      expectedSemesterNum: // value for 'expectedSemesterNum'
 *      selectedSubjectCodes: // value for 'selectedSubjectCodes'
 *   },
 * });
 */
export function useRecommendLearningPathQuery(baseOptions?: Apollo.QueryHookOptions<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>(RecommendLearningPathDocument, options);
      }
export function useRecommendLearningPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>(RecommendLearningPathDocument, options);
        }
export function useRecommendLearningPathSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>(RecommendLearningPathDocument, options);
        }
export type RecommendLearningPathQueryHookResult = ReturnType<typeof useRecommendLearningPathQuery>;
export type RecommendLearningPathLazyQueryHookResult = ReturnType<typeof useRecommendLearningPathLazyQuery>;
export type RecommendLearningPathSuspenseQueryHookResult = ReturnType<typeof useRecommendLearningPathSuspenseQuery>;
export type RecommendLearningPathQueryResult = Apollo.QueryResult<RecommendLearningPathQuery, RecommendLearningPathQueryVariables>;
export function refetchRecommendLearningPathQuery(variables?: RecommendLearningPathQueryVariables) {
      return { query: RecommendLearningPathDocument, variables: variables }
    }
export const UserMakeUpClassDocument = gql`
    query UserMakeUpClass {
  makeUpClass {
    classId
    classroom
    courseCode
    createdDate
    end
    start
    time
    title
  }
}
    `;

/**
 * __useUserMakeUpClassQuery__
 *
 * To run a query within a React component, call `useUserMakeUpClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMakeUpClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMakeUpClassQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserMakeUpClassQuery(baseOptions?: Apollo.QueryHookOptions<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>(UserMakeUpClassDocument, options);
      }
export function useUserMakeUpClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>(UserMakeUpClassDocument, options);
        }
export function useUserMakeUpClassSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>(UserMakeUpClassDocument, options);
        }
export type UserMakeUpClassQueryHookResult = ReturnType<typeof useUserMakeUpClassQuery>;
export type UserMakeUpClassLazyQueryHookResult = ReturnType<typeof useUserMakeUpClassLazyQuery>;
export type UserMakeUpClassSuspenseQueryHookResult = ReturnType<typeof useUserMakeUpClassSuspenseQuery>;
export type UserMakeUpClassQueryResult = Apollo.QueryResult<UserMakeUpClassQuery, UserMakeUpClassQueryVariables>;
export function refetchUserMakeUpClassQuery(variables?: UserMakeUpClassQueryVariables) {
      return { query: UserMakeUpClassDocument, variables: variables }
    }
export const CourseMakeUpClassDocument = gql`
    query CourseMakeUpClass($courseCode: String) {
  makeUpClass(courseCode: $courseCode) {
    classId
    classroom
    courseCode
    createdDate
    end
    start
    time
    title
  }
}
    `;

/**
 * __useCourseMakeUpClassQuery__
 *
 * To run a query within a React component, call `useCourseMakeUpClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseMakeUpClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseMakeUpClassQuery({
 *   variables: {
 *      courseCode: // value for 'courseCode'
 *   },
 * });
 */
export function useCourseMakeUpClassQuery(baseOptions?: Apollo.QueryHookOptions<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>(CourseMakeUpClassDocument, options);
      }
export function useCourseMakeUpClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>(CourseMakeUpClassDocument, options);
        }
export function useCourseMakeUpClassSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>(CourseMakeUpClassDocument, options);
        }
export type CourseMakeUpClassQueryHookResult = ReturnType<typeof useCourseMakeUpClassQuery>;
export type CourseMakeUpClassLazyQueryHookResult = ReturnType<typeof useCourseMakeUpClassLazyQuery>;
export type CourseMakeUpClassSuspenseQueryHookResult = ReturnType<typeof useCourseMakeUpClassSuspenseQuery>;
export type CourseMakeUpClassQueryResult = Apollo.QueryResult<CourseMakeUpClassQuery, CourseMakeUpClassQueryVariables>;
export function refetchCourseMakeUpClassQuery(variables?: CourseMakeUpClassQueryVariables) {
      return { query: CourseMakeUpClassDocument, variables: variables }
    }
export const SubjectDocument = gql`
    query Subject($code: String!) {
  subject(code: $code) {
    code
    department
    equivalentCode
    isActive
    nameEN
    nameVN
    oldCode
    practicalCredit
    previousCode
    requiredCode
    summary
    theoreticalCredit
    type
    equivalentSubjects {
      code
      department
      equivalentCode
      isActive
      nameEN
      nameVN
      oldCode
      practicalCredit
      previousCode
      requiredCode
      summary
      theoreticalCredit
      type
    }
    previousSubjects {
      code
      department
      equivalentCode
      isActive
      nameEN
      nameVN
      oldCode
      practicalCredit
      previousCode
      requiredCode
      summary
      theoreticalCredit
      type
    }
    requiredSubjects {
      code
      department
      equivalentCode
      isActive
      nameEN
      nameVN
      oldCode
      practicalCredit
      previousCode
      requiredCode
      summary
      theoreticalCredit
      type
    }
  }
}
    `;

/**
 * __useSubjectQuery__
 *
 * To run a query within a React component, call `useSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSubjectQuery(baseOptions: Apollo.QueryHookOptions<SubjectQuery, SubjectQueryVariables> & ({ variables: SubjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
      }
export function useSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
        }
export function useSubjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
        }
export type SubjectQueryHookResult = ReturnType<typeof useSubjectQuery>;
export type SubjectLazyQueryHookResult = ReturnType<typeof useSubjectLazyQuery>;
export type SubjectSuspenseQueryHookResult = ReturnType<typeof useSubjectSuspenseQuery>;
export type SubjectQueryResult = Apollo.QueryResult<SubjectQuery, SubjectQueryVariables>;
export function refetchSubjectQuery(variables: SubjectQueryVariables) {
      return { query: SubjectDocument, variables: variables }
    }
export const SearchUsersDocument = gql`
    query SearchUsers($keyword: String!) {
  users(keyword: $keyword) {
    auth
    city
    confirmed
    country
    department
    email
    firstaccess
    fullname
    id
    lang
    lastaccess
    mailformat
    username
    profileimageurlsmall
    profileimageurl
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables> & ({ variables: SearchUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export function useSearchUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersSuspenseQueryHookResult = ReturnType<typeof useSearchUsersSuspenseQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export function refetchSearchUsersQuery(variables: SearchUsersQueryVariables) {
      return { query: SearchUsersDocument, variables: variables }
    }