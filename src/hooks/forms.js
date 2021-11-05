import {
    useState,
    useCallback
} from 'react';

export function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (evt) => {
        const input = evt.target;
        const value = input.value;
        const name = input.name;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: input.validationMessage
        });
        setIsValid(input.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (clearValues = {}, clearErrors = {}, clearIsValid = false) => {
            setValues(clearValues);
            setErrors(clearErrors);
            setIsValid(clearIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        handleChange,
        resetForm,
        errors,
        isValid
    };
}