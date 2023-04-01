export const FORM_ATTRS = {
    IS_VALID: '$valid',
    INVALID_FIELDS: '$invalidFields',
    LOADING: '$loading',
    VALIDATION_LOADING: '$validationLoading',
    DEPENDENCIES: 'dependencies',
    FIELDS_LIST: 'fieldsList',
    FIELDSETS_LIST: 'fieldSetsList',
    FORM_ERRORS: 'formErrors'
}

export const DEFAULT_FORM_CONFIG = {
    [FORM_ATTRS.IS_VALID]: true,
    [FORM_ATTRS.INVALID_FIELDS]: [],
    [FORM_ATTRS.LOADING]: false,
    [FORM_ATTRS.DEPENDENCIES]: [],
    [FORM_ATTRS.FIELDS_LIST]: [],
    [FORM_ATTRS.FORM_ERRORS]: [],
}

export const FORM_METHODS = {
    VALIDATE_FORM: 'validateForm',
    SET_FORM_LOADING: 'setFormLoading',
    SET_FORM_ERRORS: 'setFormErrors',
    GET_FORM_VALUES: 'getFormValues',
    RESET_FORM: 'resetForm',
    GET_FIELDS: 'getFormFields',
    RESET_FORM_ERRORS: 'resetFormErrors',
    ON_FORM_FOCUS: 'onFormFocus'
}

export const DEPENDENCIES_TYPES = {
    MODEL_CHANGE: 'modelChange'
}