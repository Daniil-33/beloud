import { DEFAULT_FIELD_CONFIG, FIELD_ATTRS, FIELD_METHODS } from '@/shared/consts/formManager/field'
import { removeEmptyObjectAttrs, set as _set, promiseWrap as _promiseWrap } from '@/shared/helpers/utilsHelper'
import { ref, computed, watch } from 'vue'

function _createField(fieldConfig={}) {
    const config = { ...JSON.parse(JSON.stringify(DEFAULT_FIELD_CONFIG)), ...fieldConfig }
    const field = { ...config }

    return {
        field,
        _setObjectLink: (reactiveFieldLink) => _initField(reactiveFieldLink, config)
    }
}

function _initField(field, config={}) {
    _fillMethods(field)
    _fillComputed(field)
    _fillWatchers(field)

    _setDefaultValue(field)
    _setErrors(field, Object.entries(config.validators).map(([validatorName, validatorMethod]) => [validatorName, false]))

    return field
}

function _fillMethods(field) {
    field[FIELD_METHODS.SET_VALUE] = (value) => _setFieldValue(field, value)
    field[FIELD_METHODS.GET_VALUE] = () => _getFieldValue(field)
    field[FIELD_METHODS.SET_ERRORS] = (erorsEntries) => _setErrors(field, erorsEntries)
    field[FIELD_METHODS.RESET_FIELD] = () => _resetField(field)
    field[FIELD_METHODS.CLEAR_UNNATIVE_ERRORS] = () => _clearUnnativeErrors(field)
    field[FIELD_METHODS.SET_CUSTOM_OPTIONS] = (propertyEntries) => _setCustomOptions(field, propertyEntries)
    field[FIELD_METHODS.ADD_VALIDATOR] = (validatorsEntries) => _addValidator(field, validatorsEntries)
    field[FIELD_METHODS.REMOVE_VALIDATOR] = (validatorsNames) => _removeValidator(field, validatorsNames)
    field[FIELD_METHODS.SET_FIELD_LOADING] = (value) => _setFieldLoading(field, !!value)
    field[FIELD_METHODS.SET_FIELD_VALIDATOIN_LOADING] = (value) => _setFieldValidationLoading(field, !!value)
    field[FIELD_METHODS.VALIDATE_FIELD] = () => _validateField(field)
    field[FIELD_METHODS.ENABLE_FIELD] = () => _enableField(field)
    field[FIELD_METHODS.DISABLE_FIELD] = () => _disableField(field)
    field[FIELD_METHODS.ON_FIELD_BLUR] = () => _onFieldBlur(field)
    field[FIELD_METHODS.TOUCH] = () => _touchField(field)
    field[FIELD_METHODS.UNTOUCH] = () => _unTouchField(field)
}

function _fillComputed(field) {
    field[FIELD_ATTRS.IS_VALID] = computed(() => _isValid(field))
}

function _fillWatchers(field) {
    watch(() => field.model, () => {
        if (field[FIELD_ATTRS.TOUCHED]) {
            _clearUnnativeErrors(field)
            _validateField(field)
        }
    })
}

function _onFieldBlur(field) {
    _touchField(field)
    _clearUnnativeErrors(field)
    _validateField(field)
}

function _setDefaultValue(field) {
    if (field[FIELD_ATTRS.DEFAULT_VALUE]) {
        _setFieldLoading(field, true)
        _set(field, FIELD_ATTRS.VALUE, '')

        _promiseWrap(field[FIELD_ATTRS.DEFAULT_VALUE], [field])
            .then((value) => {
                _set(field, FIELD_ATTRS.VALUE, value)
                _setFieldLoading(field, false)
            })
            .catch((error) => {
                console.error(`Failed to create filed`, error)

                _set(field, FIELD_ATTRS.VALUE, '')
                _set(field, FIELD_ATTRS.LOADING, false)
            })
    } else {
        _set(field, FIELD_ATTRS.VALUE, '')
    }
}

function _validateField(field) {
    const validators = field[FIELD_ATTRS.VALIDATORS]

    if (!validators || !Object.keys(validators).length) {
        return true
    }

    const isAnyValidatorAsync = Object.values(validators).some((func) => func.constructor.name === 'AsyncFunction')

    if (isAnyValidatorAsync) {
        return _validateFieldAsync(field, validators)
    } else {
        return _validateFieldSync(field, validators)
    }
}

function _validateFieldSync(field, validators) {
    const validationResult = Object.entries(validators).map(([validatorName, validatorMethod]) => [validatorName, validatorMethod(field[FIELD_ATTRS.VALUE])])
    const isValid = validationResult.map(([validatorName, validationResult]) => validationResult).every(result => result)

    _setErrors(field, validationResult.map(([validatorName, validationResult]) => [validatorName, !validationResult]))
    return isValid
}

function _validateFieldAsync(field, validators) {
    _setFieldValidationLoading(field, true)

    return new Promise(async (resolve, reject) => {
        const validationResult = []
        const validationPromises= Object.entries(validators).map(([validatorName, validatorMethod]) => {
            return new Promise(async (res, rej) => {
                const result = await validatorMethod(field[FIELD_ATTRS.VALUE])
                validationResult.push([validatorName, result])

                res()
            })
        })

        await Promise.all(validationPromises)
        const isValid = validationResult.map(([validatorName, validationResult]) => validationResult).every(result => result)

        _setErrors(field, validationResult.map(([validatorName, validationResult]) => [validatorName, !validationResult]))
        _setFieldValidationLoading(field, false)
        resolve(isValid)
    })
}

function _setErrors(field, errorsEntries) {
    errorsEntries.forEach(([errorName, errorValue]) => {
        field[FIELD_ATTRS.ERRORS][errorName] = errorValue
    })

    removeEmptyObjectAttrs(field[FIELD_ATTRS.ERRORS])
}

function _clearUnnativeErrors(field) {
    const validatorsNames = Object.keys(field[FIELD_ATTRS.VALIDATORS])
    const clearedErrorEntries = Object.entries(field[FIELD_ATTRS.ERRORS])
        .map(([errorName, errorValue]) => [errorName, (validatorsNames.includes(errorName) ? errorValue : null)])

    return _setErrors(field, clearedErrorEntries)
}

function _resetField(field) {
    const validatorsNames = Object.keys(field[FIELD_ATTRS.VALIDATORS])

    _clearUnnativeErrors(field)
    _unTouchField(field)
    _setDefaultValue(field)
    _setErrors(field, validatorsNames.map((vanidatorName) => [vanidatorName, null]))
}

function _disableField(field) {
    const validators = field[FIELD_ATTRS.VALIDATORS]
    _unTouchField(field)
    _setErrors(field, Object.keys(validators).map((validatorName) => [validatorName, false]))

    return _set(field, FIELD_ATTRS.DISABLED, true)
}

function _enableField(field) {
    return _set(field, FIELD_ATTRS.DISABLED, false)
}

function _setFieldLoading(field, value) {
    _set(field, FIELD_ATTRS.LOADING, value)
}

function _setFieldValidationLoading(field, value) {
    return _set(field, FIELD_ATTRS.VALIDATION_LOADING, value)
}

function _addValidator(field, validatorsEntries) {
    validatorsEntries.forEach(([validatorName, validatorMethod]) => {
        _set(field[FIELD_ATTRS.VALIDATORS], validatorName, validatorMethod)
    })
}

function _removeValidator(field, validatorsNames) {
    validatorsNames.forEach((validatorName) => {
        _set(field[FIELD_ATTRS.VALIDATORS], validatorName, null)
    })

    removeEmptyObjectAttrs(field[FIELD_ATTRS.VALIDATORS])
}

function _touchField(field) {
    return _set(field, FIELD_ATTRS.TOUCHED, true)
}

function _unTouchField(field) {
    return _set(field, FIELD_ATTRS.TOUCHED, false)
}

function _setCustomOptions(field, propertyEntries) {
    propertyEntries.forEach(([propertyName, propertyValue]) => {
        _set(field[FIELD_ATTRS.CUSTOM_OPTIONS], propertyName, propertyValue)
    })
}

function _setFieldValue(field, value) {
    _set(field, FIELD_ATTRS.VALUE, value)
}

function _getFieldValue(field) {
    return field.valueFormatter ? field.valueFormatter (field.model) : field.model
}

function _isValid(field) {
    return Object.values(field[FIELD_ATTRS.ERRORS]).every(value => !value)
}

export default function (config) {
    return _createField(config)
}