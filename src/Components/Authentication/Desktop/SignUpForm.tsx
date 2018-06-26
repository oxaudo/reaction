import { Formik, FormikProps } from "formik"
import React from "react"

import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import {
  FormComponentType,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { SignUpValidator } from "Components/Authentication/Validators"
import Input from "Components/Input"

export const SignUpForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={SignUpValidator}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        dirty,
        status,
        setTouched,
        validateForm,
      }: FormikProps<InputValues>) => {
        const hasErrors = Object.keys(errors).length > 0

        return (
          <Form onSubmit={handleSubmit} height={430}>
            <Input
              block
              quick
              error={touched.email && errors.email}
              placeholder="Enter your email address"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              quick
              error={touched.password && errors.password}
              placeholder="Enter a password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              showPasswordMessage
            />
            <Input
              block
              quick
              error={touched.name && errors.name}
              placeholder="Enter your full name"
              name="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TermsOfServiceCheckbox
              error={
                touched.acceptedTermsOfService && errors.acceptedTermsOfService
              }
              checked={values.acceptedTermsOfService}
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="accepted_terms_of_service"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && !status.success && <Error show>{status.error}</Error>}
            <SubmitButton disabled={isSubmitting || hasErrors || !dirty}>
              Sign up
            </SubmitButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.login)}
              onFacebookLogin={e => {
                if (!values.acceptedTermsOfService) {
                  setTouched({
                    acceptedTermsOfService: true,
                  })
                } else {
                  props.onFacebookLogin(e)
                }
              }}
              onTwitterLogin={props.onTwitterLogin}
              inline
            />
          </Form>
        )
      }}
    </Formik>
  )
}
