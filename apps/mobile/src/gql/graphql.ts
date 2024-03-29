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
};

export type AuthEntity = {
  __typename?: 'AuthEntity';
  access_token: Scalars['String']['output'];
  auth?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  confirmed?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstaccess?: Maybe<Scalars['Int']['output']>;
  fullname: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  lastaccess?: Maybe<Scalars['Int']['output']>;
  mailformat?: Maybe<Scalars['String']['output']>;
  preferences: Array<UserPreference>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
  suspended?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Calendar = {
  __typename?: 'Calendar';
  id: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Course = {
  __typename?: 'Course';
  categoryid?: Maybe<Scalars['Int']['output']>;
  categoryname?: Maybe<Scalars['String']['output']>;
  courseimage?: Maybe<Scalars['String']['output']>;
  enddate?: Maybe<Scalars['Int']['output']>;
  enrollmentmethods?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hiddenbynumsections?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  idnumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overviewfiles?: Maybe<Scalars['String']['output']>;
  pdfexportfont?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['Int']['output']>;
  shortname?: Maybe<Scalars['String']['output']>;
  showactivitydates?: Maybe<Scalars['Boolean']['output']>;
  showcompletionconditions?: Maybe<Scalars['String']['output']>;
  sortorder?: Maybe<Scalars['Int']['output']>;
  startdate?: Maybe<Scalars['Int']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  summaryfiles?: Maybe<Scalars['String']['output']>;
  summaryformat?: Maybe<Scalars['Int']['output']>;
  uservisible?: Maybe<Scalars['Boolean']['output']>;
  viewurl?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type CourseContentEntity = {
  __typename?: 'CourseContentEntity';
  courseid?: Maybe<Course>;
  hiddenbynumsections?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  section?: Maybe<Scalars['Int']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  summaryformat?: Maybe<Scalars['Int']['output']>;
  uservisible?: Maybe<Scalars['Boolean']['output']>;
  visible?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  findAllEventByCourseIds: Array<Calendar>;
  login: AuthEntity;
};


export type MutationFindAllEventByCourseIdsArgs = {
  courseids: Array<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  findAll: Array<Subject>;
  findAllCourseContents: Array<CourseContentEntity>;
  findAllCoursesOfUser: Array<Course>;
  findOne: Array<Subject>;
  profile: User;
};


export type QueryFindAllArgs = {
  nameVN: Scalars['String']['input'];
};


export type QueryFindAllCourseContentsArgs = {
  course_id: Scalars['Float']['input'];
};


export type QueryFindAllCoursesOfUserArgs = {
  isNew?: Scalars['Boolean']['input'];
};


export type QueryFindOneArgs = {
  code: Scalars['String']['input'];
};

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['String']['output'];
  department: Scalars['String']['output'];
  equivalentCode?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  nameEN: Scalars['String']['output'];
  nameVN: Scalars['String']['output'];
  oldCode?: Maybe<Scalars['String']['output']>;
  practicalCredit: Scalars['Int']['output'];
  previousCode?: Maybe<Scalars['String']['output']>;
  requiredCode?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  theoreticalCredit: Scalars['Int']['output'];
  type: Scalars['String']['output'];
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
  id?: Maybe<Scalars['Int']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  lastaccess?: Maybe<Scalars['Int']['output']>;
  mailformat?: Maybe<Scalars['String']['output']>;
  preferences: Array<UserPreference>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
  suspended?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserPreference = {
  __typename?: 'UserPreference';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LoginApiMutationVariables = Exact<{
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type LoginApiMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthEntity', access_token: string, auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, profileimageurl?: string | null, profileimageurlsmall?: string | null, suspended?: string | null, theme?: string | null, timezone?: string | null, token: string, username: string } };


export const LoginApiDocument = gql`
    mutation LoginAPI($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    access_token
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