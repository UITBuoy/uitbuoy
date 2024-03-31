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
  id?: Maybe<Scalars['Int']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  lastaccess?: Maybe<Scalars['Int']['output']>;
  mailformat?: Maybe<Scalars['String']['output']>;
  preferences: Array<UserPreference>;
  profileimageurl?: Maybe<Scalars['String']['output']>;
  profileimageurlsmall?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiredDate?: Maybe<Scalars['Date']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
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
  coursecategory?: Maybe<Scalars['String']['output']>;
  courseimage?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  enddate?: Maybe<Scalars['Int']['output']>;
  enrollmentmethods?: Maybe<Scalars['String']['output']>;
  events: Array<EventEntity>;
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


export type CourseEventsArgs = {
  isComing?: InputMaybe<Scalars['Boolean']['input']>;
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

export type EventEntity = {
  __typename?: 'EventEntity';
  action?: Maybe<Scalars['String']['output']>;
  activityname?: Maybe<Scalars['String']['output']>;
  activitystr?: Maybe<Scalars['String']['output']>;
  candelete?: Maybe<Scalars['Boolean']['output']>;
  canedit?: Maybe<Scalars['Boolean']['output']>;
  categoryid?: Maybe<Scalars['String']['output']>;
  component?: Maybe<Scalars['String']['output']>;
  course: Course;
  deleteurl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  editurl?: Maybe<Scalars['String']['output']>;
  eventcount?: Maybe<Scalars['String']['output']>;
  eventtype?: Maybe<Scalars['String']['output']>;
  formattedlocation?: Maybe<Scalars['String']['output']>;
  formattedtime?: Maybe<Scalars['String']['output']>;
  groupid?: Maybe<Scalars['String']['output']>;
  groupname?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  instance?: Maybe<Scalars['Int']['output']>;
  isactionevent?: Maybe<Scalars['Boolean']['output']>;
  iscategoryevent?: Maybe<Scalars['Boolean']['output']>;
  iscourseevent?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  modulename?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  normalisedeventtype?: Maybe<Scalars['String']['output']>;
  normalisedeventtypetext?: Maybe<Scalars['String']['output']>;
  overdue?: Maybe<Scalars['Boolean']['output']>;
  purpose?: Maybe<Scalars['String']['output']>;
  repeatid?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<Scalars['String']['output']>;
  timeduration?: Maybe<Scalars['Int']['output']>;
  timemodified?: Maybe<Scalars['Int']['output']>;
  timesort?: Maybe<Scalars['Int']['output']>;
  timestart?: Maybe<Scalars['Int']['output']>;
  timeusermidnight?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userid?: Maybe<Scalars['Int']['output']>;
  viewurl?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  findAllEventByCourseIds: Array<Calendar>;
  login: AuthEntity;
  refreshToken: AuthEntity;
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
  findOne: Array<Subject>;
  profile: User;
  userCourses: Array<Course>;
  userEvents: Array<EventEntity>;
};


export type QueryFindAllArgs = {
  nameVN: Scalars['String']['input'];
};


export type QueryFindAllCourseContentsArgs = {
  course_id: Scalars['Float']['input'];
};


export type QueryFindOneArgs = {
  code: Scalars['String']['input'];
};


export type QueryUserCoursesArgs = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserEventsArgs = {
  isComing?: InputMaybe<Scalars['Boolean']['input']>;
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


export type LoginApiMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthEntity', access_token: string, refresh_token?: string | null, auth?: string | null, city?: string | null, confirmed?: string | null, country?: string | null, department?: string | null, email: string, firstaccess?: number | null, fullname: string, id?: number | null, lang?: string | null, lastaccess?: number | null, mailformat?: string | null, profileimageurl?: string | null, profileimageurlsmall?: string | null, suspended?: string | null, theme?: string | null, timezone?: string | null, token: string, username: string } };

export type SearchCoursesQueryVariables = Exact<{
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchCoursesQuery = { __typename?: 'Query', userCourses: Array<{ __typename?: 'Course', coursecategory?: string | null, display_name?: string | null, enddate?: number | null, id?: number | null, shortname?: string | null, startdate?: number | null }> };

export type UserCoursesQueryVariables = Exact<{
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  isRecent?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserCoursesQuery = { __typename?: 'Query', userCourses: Array<{ __typename?: 'Course', categoryid?: number | null, categoryname?: string | null, display_name?: string | null, coursecategory?: string | null, courseimage?: string | null, enddate?: number | null, enrollmentmethods?: string | null, fullname?: string | null, hiddenbynumsections?: number | null, id?: number | null, idnumber?: string | null, name?: string | null, overviewfiles?: string | null, pdfexportfont?: string | null, section?: number | null, shortname?: string | null, showactivitydates?: boolean | null, showcompletionconditions?: string | null, sortorder?: number | null, startdate?: number | null, summary?: string | null, summaryfiles?: string | null, summaryformat?: number | null, uservisible?: boolean | null, viewurl?: string | null, visible?: boolean | null }> };

export type UserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserEventsQuery = { __typename?: 'Query', userEvents: Array<{ __typename?: 'EventEntity', activityname?: string | null, purpose?: string | null, overdue?: boolean | null, timeduration?: number | null, timeusermidnight?: number | null, timestart?: number | null, timesort?: number | null, timemodified?: number | null, name: string, id: number, course: { __typename?: 'Course', categoryid?: number | null, categoryname?: string | null, coursecategory?: string | null, courseimage?: string | null, display_name?: string | null, enddate?: number | null, enrollmentmethods?: string | null, fullname?: string | null, hiddenbynumsections?: number | null, id?: number | null, idnumber?: string | null, name?: string | null, overviewfiles?: string | null, pdfexportfont?: string | null, section?: number | null, shortname?: string | null, showactivitydates?: boolean | null, showcompletionconditions?: string | null, sortorder?: number | null, startdate?: number | null, summary?: string | null, summaryfiles?: string | null, summaryformat?: number | null, uservisible?: boolean | null, viewurl?: string | null, visible?: boolean | null } }> };


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
export const SearchCoursesDocument = gql`
    query SearchCourses($isNew: Boolean, $keyword: String) {
  userCourses(isNew: $isNew, isRecent: false, keyword: $keyword) {
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
    enrollmentmethods
    fullname
    hiddenbynumsections
    id
    idnumber
    name
    overviewfiles
    pdfexportfont
    section
    shortname
    showactivitydates
    showcompletionconditions
    sortorder
    startdate
    summary
    summaryfiles
    summaryformat
    uservisible
    viewurl
    visible
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
    query UserEvents {
  userEvents {
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
    course {
      categoryid
      categoryname
      coursecategory
      courseimage
      display_name
      enddate
      enrollmentmethods
      fullname
      hiddenbynumsections
      id
      idnumber
      name
      overviewfiles
      pdfexportfont
      section
      shortname
      showactivitydates
      showcompletionconditions
      sortorder
      startdate
      summary
      summaryfiles
      summaryformat
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