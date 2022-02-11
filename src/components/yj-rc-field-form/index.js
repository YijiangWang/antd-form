import React from 'react';
import _Form from './Form';
import Field from './Field';
import useForm from './useForm';

const Form = _Form;
Form.Item = Field;
Form.useForm = useForm;

export {Field, useForm};
export default Form;