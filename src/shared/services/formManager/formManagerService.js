import { FORM_ATTRS, DEFAULT_FORM_CONFIG, FORM_METHODS, DEPENDENCIES_TYPES } from '../../consts/formManager/form'
import { FIELD_ATTRS, FIELD_METHODS } from '@/shared/consts/formManager/field'
import { FIELDSET_ATTRS, FIELDSET_METHODS } from '@/shared/consts/formManager/fieldSet'
import { reactive, computed, watch } from 'vue'
import { set as _set } from '../../helpers/utilsHelper'
import _createField from './formField'
import _createFormFieldSet from './formFieldSet'

function _initForm(schema={}) {
    if (!schema || !Object.keys(schema).length) {
        console.error('Form can not be created without any schema')
        return
    }

    const form = reactive({
        ...DEFAULT_FORM_CONFIG,
        [FORM_ATTRS.FIELDS_LIST]: Object.keys(schema.fields || {}),
        [FORM_ATTRS.FIELDSETS_LIST]: Object.keys(schema.fieldSets || {})
    })

    Object.entries(schema.fieldSets || {}).forEach(([fieldName, fieldConfig]) => {
        const { fieldSet, _setObjectLink } = _createFormFieldSet(fieldConfig)
        _set(form, fieldName, fieldSet)
        _setObjectLink(form[fieldName])
    })

    Object.entries(schema.fields || {}).forEach(([fieldName, fieldConfig]) => {
        const { field, _setObjectLink } = _createField(fieldConfig)
        _set(form, fieldName, field)
        _setObjectLink(form[fieldName])
    })

    _fillMethods(form)
    _fillComputed(form)
    _fillWatchers(form)
    _setFieldsDependencies(form, schema.dependencies)

    return form
}

function _fillMethods(form) {
    form[FORM_METHODS.VALIDATE_FORM] = () => _validateForm(form)
    form[FORM_METHODS.SET_FORM_LOADING] = (value) => _setFormLoading(form, value)
    form[FORM_METHODS.SET_FORM_ERRORS] = (value) => _setFormErrors(form, value)
    form[FORM_METHODS.GET_FORM_VALUES] = (options={}) => _getFormValues(form, options)
    form[FORM_METHODS.RESET_FORM] = () => _resetFrom(form)
    form[FORM_METHODS.GET_FIELDS] = () => _getFormFields(form)
    form[FORM_METHODS.ON_FORM_FOCUS] = () => _resetFormErrors(form)
}

function _fillComputed(form) {
    form[FORM_ATTRS.IS_VALID] = computed(() => _isValid(form))
    form[FORM_ATTRS.INVALID_FIELDS] = computed(() => _formInvalidFields(form))
}

function _fillWatchers(field) {}

function _setFieldsDependencies(form, dependencies={}) {
    const dependenciesEntries = Object.entries(dependencies)

    dependenciesEntries.forEach(([parentFieldName, config]) => {
        const configEntries = Object.entries(config)

        configEntries.forEach(([childFieldName, dependencyConfig]) => {
            switch(dependencyConfig.type) {
                case DEPENDENCIES_TYPES.MODEL_CHANGE:
                    watch(() => form[parentFieldName][FIELD_ATTRS.VALUE], () => dependencyConfig.callback(form[parentFieldName], form[childFieldName],))
                    break;
            }
        })
    })
}

function _validateForm(form) {
    const validationResults = form[FORM_ATTRS.FIELDS_LIST]
        .map((fieldName) => form[fieldName])
        .map((field) => {
            field.touch()
            return field.validateField()
        })

    const isAsyncValidation = validationResults.some((result) => result.then)

    if (!isAsyncValidation) {
        const isValid = validationResults.every((value) => value)
        return isValid
    } else {
        _setFormValidationLoading(form, true)

        return new Promise(async (resolve, reject) => {
            const validationResult = await Promise.all(validationResults)
            const isValid = validationResult.every((value) => value)

            _setFormValidationLoading(form, false)
            resolve(isValid)
        })
    }
}

function _setFormLoading(form, value) {
    _set(form, FORM_ATTRS.LOADING, value)
}

function _setFormValidationLoading(form, value) {
    _set(form, FORM_ATTRS.VALIDATION_LOADING, value)
}

function _setFormErrors(form, errors, options={touch: false}) {
    debugger
    Object.entries(errors)
        .forEach(([fieldNameString, errorsObject]) => {
            const [parentFieldName, childFieldName] = fieldNameString.split('.')
            const field = childFieldName ? form[parentFieldName]?.[childFieldName] : form[parentFieldName]

            if (!field) {
                return form[FORM_ATTRS.FORM_ERRORS].push(
                    ...(typeof errorsObject === 'object' ? Object.values(errorsObject) : [errorsObject])
                )
            }

            field[FIELD_METHODS.SET_ERRORS](Object.entries(errorsObject))
            options.touch && field[FIELD_METHODS.TOUCH]()
        })
}

// TODO применение опций для трансформации возвращаемого объекта
function _getFormValues(form, options={}) {
    const fieldsValues = Object.fromEntries(form[FORM_ATTRS.FIELDS_LIST]
        .map((fieldName) => [fieldName, form[fieldName][FIELD_METHODS.GET_VALUE]()])
    )

    const fieldSetsValues = Object.fromEntries(form[FORM_ATTRS.FIELDSETS_LIST]
        .map((fieldSetName) => [fieldSetName, form[fieldSetName][FIELDSET_METHODS.GET_VALUE]()])
    )

    return {
        ...fieldsValues,
        ...fieldSetsValues
    }
}

function _resetFrom(form) {
    const fields = form[FORM_METHODS.GET_FIELDS]()
    const fieldSetsFields = form[FORM_ATTRS.FIELDSETS_LIST]
        .map((fieldSetName) => form[fieldSetName][FIELDSET_METHODS.GET_FIELDS]())
        .flat()

    form[FORM_ATTRS.FORM_ERRORS] = []

    fields
        .concat(fieldSetsFields)
        .forEach((field) => field[FIELD_METHODS.RESET_FIELD]())
}

function _getFormFields(form) {
    return form[FORM_ATTRS.FIELDS_LIST].map((fieldName) => form[fieldName])
}

function _isValid(form) {
    const isAllFieldsValid = form[FORM_ATTRS.FIELDS_LIST]
        .map((fieldName) => form[fieldName])
        .every((field) => field[FIELD_ATTRS.IS_VALID])

    const isAllFieldSetsValid = form[FORM_ATTRS.FIELDSETS_LIST]
        .map((fieldSetName) => form[fieldSetName])
        .every((fieldSet) => fieldSet[FIELDSET_ATTRS.IS_VALID])

    return [isAllFieldsValid, isAllFieldSetsValid].every((value) => value)
}

function _formInvalidFields(form) {
    const invalidFields = form[FORM_ATTRS.FIELDS_LIST]
        .filter((fieldName) => !form[fieldName][FIELD_ATTRS.IS_VALID] && !form[fieldName][FIELD_ATTRS.DISABLED])

    const invalidFieldSets = form[FORM_ATTRS.FIELDSETS_LIST]
        .map((fieldSetName) => [fieldSetName, form[fieldSetName][FIELDSET_ATTRS.INVALID_FIELDS]])
        .map(([fieldSetName, invalidFieldSetFields]) => invalidFieldSetFields.map(fieldName => `${fieldSetName}.${fieldName}`))
        .flat()

    return [...invalidFields, ...invalidFieldSets]
}

function _resetFormErrors(form) {
    form[FORM_ATTRS.FORM_ERRORS] = []
}


export default function(schema={}) {
    const form = _initForm(schema)

    return form
}