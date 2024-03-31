const WS_FUNCTION = {
    //
    GET_USER_PROFILE: 'core_user_get_users_by_field',

    //get the general infomation of course by [field,value]
    GET_COURSE_PROFILE: 'core_course_get_courses_by_field ',

    //get list of children (module) of course by course_id
    GET_COURSE_CONTENT_BY_ID: 'core_course_get_contents ',

    //get one child (module) of course by module_id
    GET_COURSE_MODULE: 'core_course_get_course_module',

    //get list of course of user by classification ('past' + 'inprogress') - cuz 'future' is nonsense
    GET_COURSE_BY_TIMELINE:
        'core_course_get_enrolled_courses_by_timeline_classification',

    //get list of event of user by list of course id
    GET_EVENT_BY_COURSE_IDS: 'core_calendar_get_action_events_by_courses',

    GET_COURSE_BY_FIELD: 'core_course_get_courses_by_field',
};

export default WS_FUNCTION;
