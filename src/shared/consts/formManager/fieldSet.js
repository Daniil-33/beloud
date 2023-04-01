export const FIELDSET_ATTRS = {
    DISABLED: '$disabled',
    IS_VALID: '$valid',
    INVALID_FIELDS: '$invalidFields',
    LOADING: '$loading',
    VALIDATION_LOADING: '$validationLoading',
    FIELDS_LIST: 'fieldsList'
}

export const DEFAULT_FIELDSET_CONFIG = {
    [FIELDSET_ATTRS.DISABLED]: false,
    [FIELDSET_ATTRS.IS_VALID]: false,
    [FIELDSET_ATTRS.INVALID_FIELDS]: false,
    [FIELDSET_ATTRS.LOADING]: false,
    [FIELDSET_ATTRS.VALIDATION_LOADING]: false,
    [FIELDSET_ATTRS.FIELDS_LIST]: [],
}

export const FIELDSET_METHODS = {
    VALIDATE_FIELDSET: 'validateFieldSet',
    GET_FIELDSET_VALUE: 'getFieldSetValue',
    SET_FIELDSET_LOADING: 'setFieldSetLoading',
    ENABLE_FIELDSET: 'enableFieldSet',
    DISABLE_FIELDSET: 'disableFieldSet',
    GET_FIELDS: 'getFieldSetFields',
}