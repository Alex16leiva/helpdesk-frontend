import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const onResetForm = (newValues = initialForm) => {
        setFormState(newValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}