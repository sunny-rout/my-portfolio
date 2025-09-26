import { ref, reactive } from 'vue'

export function useFormValidation() {
  const errors = reactive({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (form) => {
    clearErrors()
    let isValid = true

    // Name validation
    if (!form.name || form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long'
      isValid = false
    }

    // Email validation
    if (!form.email || !validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Subject validation
    if (!form.subject || form.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long'
      isValid = false
    }

    // Message validation
    if (!form.message || form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long'
      isValid = false
    }

    return isValid
  }

  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
  }

  const setError = (field, message) => {
    errors[field] = message
  }

  return {
    errors,
    validateForm,
    validateEmail,
    clearErrors,
    setError
  }
}
