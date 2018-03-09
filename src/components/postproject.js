import React from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => (value ? undefined : 'Required')

const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
            <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

let PostProjectForm = props =>{
    const {handleSubmit, pristine, reset, submitting} = props
    return(
        <div>
        <form onSubmit={handleSubmit} >
            Choose a name for your Project
            <Field name="projectName" type="text" component={renderField} label="projectName"
            validate={[required]} warn={alphaNumeric}/>
        </form>
        </div>
    )
}

PostProjectForm = reduxForm({
    form: 'postprojectform',
    required,
})(PostProjectForm);

export default reduxForm({form: 'postprojectform'})(PostProjectForm)
