import { DEFAULT_FIELDSET_CONFIG, FIELDSET_ATTRS, FIELDSET_METHODS } from '../../consts/formManager/fieldSet'
import { FIELD_ATTRS, FIELD_METHODS } from '../../consts/formManager/field'
import { set as _set } from '@/shared/helpers/utilsHelper'
import { reactive, computed, watch } from 'vue'
import _createField from './formField'

function _createFieldSet(fieldSetConfig={}) {
    if (!fieldSetConfig || !Object.keys(fieldSetConfig).length) {
        console.error('FieldSet can not be created without any schema')
        return
    }

    const config = {
        ...JSON.parse(JSON.stringify(DEFAULT_FIELDSET_CONFIG)),
        ...fieldSetConfig
    }
    const fieldSet = {
        ...config,
        [FIELDSET_ATTRS.FIELDS_LIST]: Object.keys(fieldSetConfig.fields)
    }

    return {
        fieldSet,
        _setObjectLink: (reactiveFieldLink) => _initFormSet(reactiveFieldLink, config)
    }
}

function _initFormSet(fieldSet, fieldSetConfig={}) {
    Object.entries(fieldSetConfig.fields).forEach(([fieldName, fieldConfig]) => {
        const { field, _setObjectLink } = _createField(fieldConfig)
        _set(fieldSet, fieldName, field)
        _setObjectLink(fieldSet[fieldName])
    })

    _fillMethods(fieldSet)
    _fillComputed(fieldSet)
    _fillWatchers(fieldSet)

    return fieldSet
}

function _fillMethods(fieldSet) {
    fieldSet[FIELDSET_METHODS.VALIDATE_FIELDSET] = () => _validateFieldSet(fieldSet)
    fieldSet[FIELDSET_METHODS.ENABLE_FIELDSET] = () => _enableFieldSet(fieldSet)
    fieldSet[FIELDSET_METHODS.DISABLE_FIELDSET] = () => _disableFieldSet(fieldSet)
    fieldSet[FIELDSET_METHODS.SET_FIELDSET_LOADING] = (value) => _setFieldSetLoading(fieldSet, value)
    fieldSet[FIELDSET_METHODS.GET_FIELDSET_VALUE] = () => _getFieldSetValue(fieldSet)
    fieldSet[FIELDSET_METHODS.GET_FIELDS] = () => _getFieldSetFields(fieldSet)
}

function _fillComputed(fieldSet) {
    fieldSet[FIELDSET_ATTRS.IS_VALID] = computed(() => _isValid(fieldSet))
    fieldSet[FIELDSET_ATTRS.INVALID_FIELDS] = computed(() => _fieldSetInvalidFields(fieldSet))
}

function _fillWatchers(fieldSet) {}

function _validateFieldSet(fieldSet) {
    const validationPromises = fieldSet[FIELDSET_ATTRS.FIELDS_LIST]
        .map((fieldName) => fieldSet[fieldName])
        .map((field) => {
            field.touch()
            return field.validateField()
        })

    _setFieldSetValidationLoading(fieldSet, true)
    return new Promise(async (resolve, reject) => {
        const validationResult = await Promise.all(validationPromises)
        const isValid = validationResult.every(value => value)

        _setFieldSetValidationLoading(fieldSet, false)
        resolve(isValid)
    })
}

function _setFieldSetLoading(fieldSet, value) {
    _set(fieldSet, FIELDSET_ATTRS.LOADING, value)
}

function _setFieldSetValidationLoading(fieldSet, value) {
    _set(fieldSet, FIELDSET_ATTRS.VALIDATION_LOADING, value)
}

function _disableFieldSet(fieldSet) {
    _set(fieldSet, FIELDSET_ATTRS.DISABLED, true)
    fieldSet[FIELDSET_ATTRS.FIELDS_LIST]
        .forEach((fieldName) => fieldSet[fieldName][FIELD_METHODS.DISABLE_FIELD]())
}

function _enableFieldSet(fieldSet) {
    _set(fieldSet, FIELDSET_ATTRS.DISABLED, false)
    fieldSet[FIELDSET_ATTRS.FIELDS_LIST]
        .forEach((fieldName) => fieldSet[fieldName][FIELD_METHODS.ENABLE_FIELD]())
}

function _getFieldSetValue(_getFieldSetValue) {
    const fieldValues = _getFieldSetValue[FIELDSET_ATTRS.FIELDS_LIST]
        .map((fieldName) => [fieldName, fieldSet[fieldName][FIELD_METHODS.GET_VALUE]()])

    return Object.fromEntries(fieldValues)
}

function _getFieldSetFields(fieldSet) {
    return fieldSet[FIELDSET_ATTRS.FIELDS_LIST].map((fieldName) => fieldSet[fieldName])
}

function _fieldSetInvalidFields(fieldSet) {
    return fieldSet[FIELDSET_ATTRS.FIELDS_LIST]
        .filter((fieldName) => !fieldSet[fieldName][FIELD_ATTRS.IS_VALID] && !fieldSet[fieldName][FIELD_ATTRS.DISABLED])
}

function _isValid(fieldSet) {
    return fieldSet[FIELDSET_ATTRS.FIELDS_LIST]
        .map((fieldName) => fieldSet[fieldName])
        .every((field) => field[FIELD_ATTRS.IS_VALID])
}

export default function(fieldSetConfig={}) {
    return _createFieldSet(fieldSetConfig)
}