export const FIELD_ATTRS = {
    DISABLED: '$disabled',
    LOADING: '$loading',
    VALIDATION_LOADING: '$validationLoading',
    TOUCHED: '$touched',
    ERRORS: '$errors',
    VALIDATORS: 'validators',
    CUSTOM_OPTIONS: 'customOptions',
    DEFAULT_VALUE: 'defaultValue',
    VALUE: 'model',
    IS_VALID: '$valid',
    VALUE_FORMATTER: 'valueFormatter'
}

export const DEFAULT_FIELD_CONFIG = {
    [FIELD_ATTRS.DISABLED]: false,
    [FIELD_ATTRS.LOADING]: false,
    [FIELD_ATTRS.VALIDATION_LOADING]: false,
    [FIELD_ATTRS.TOUCHED]: false,
    [FIELD_ATTRS.VALIDATORS]: {},
    [FIELD_ATTRS.DEPENDENCIES]: [],
    [FIELD_ATTRS.ERRORS]: {},
    [FIELD_ATTRS.CUSTOM_OPTIONS]: {},
    [FIELD_ATTRS.DEFAULT_VALUE]: () => '',
    [FIELD_ATTRS.VALUE]: '',
    [FIELD_ATTRS.IS_VALID]: null,
    [FIELD_ATTRS.VALUE_FORMATTER]: v => v,
}

export const FIELD_METHODS = {
    SET_VALUE: 'setFieldValue',
    GET_VALUE: 'getFieldValue',
    RESET_FIELD: 'resetField',
    SET_CUSTOM_OPTIONS: 'setCustomOptions',
    SET_ERRORS: 'setErrors',
    CLEAR_UNNATIVE_ERRORS: 'clearUnnativeErrors',
    ADD_VALIDATOR: 'addValidator',
    REMOVE_VALIDATOR: 'removeValidator',
    SET_FIELD_LOADING: 'setFieldLoading',
    SET_FIELD_VALIDATOIN_LOADING: 'setFieldValidationLoading',
    VALIDATE_FIELD: 'validateField',
    ENABLE_FIELD: 'enableField',
    DISABLE_FIELD: 'disableField',
    ON_FIELD_BLUR: 'onFieldBlur',
    TOUCH: 'touch',
    UNTOUCH: 'unTouch',
}