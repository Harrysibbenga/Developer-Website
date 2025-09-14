// src/utils/core/modules/FormManager.ts
import { BaseModule } from './BaseModule'

interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  success: boolean
  message?: string
}

export class FormManager extends BaseModule {
  private forms: Map<string, FormState> = new Map()
  private api: any = null
  private validators: any = null

  async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('📝 Form Manager: Starting...')
    
    // Import existing API and validators
    try {
      const { api, validators } = await import('../../api')
      this.api = api
      this.validators = validators
    } catch (error) {
      console.error('Failed to load API client:', error)
      return
    }
    
    this.setupForms()
    this.setupModals()
    
    this.initialized = true
    console.log('📝 Form Manager: Ready')
  }

  private setupForms(): void {
    // Find all forms with data-form attribute
    const forms = document.querySelectorAll('form[data-form]')
    
    forms.forEach(form => {
      const formElement = form as HTMLFormElement
      const formType = formElement.dataset.form
      
      if (!formType) return

      console.log(`📝 Initializing ${formType} form`)
      
      // Initialize form state
      this.forms.set(formType, {
        isSubmitting: false,
        errors: {},
        success: false
      })

      // Setup form submission
      this.addListener(formElement, 'submit', (e) => {
        this.handleFormSubmit(e, formType, formElement)
      })

      // Setup field validation using existing validators
      const inputs = formElement.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        this.addListener(input, 'blur', () => {
          this.validateField(input as HTMLInputElement, formType)
        })
        
        this.addListener(input, 'input', () => {
          this.clearFieldError(input as HTMLInputElement, formType)
        })
      })
    })
  }

  private async handleFormSubmit(
    e: Event, 
    formType: string, 
    formElement: HTMLFormElement
  ): Promise<void> {
    e.preventDefault()

    const formState = this.forms.get(formType)
    if (!formState || formState.isSubmitting) return

    // Validate all fields
    if (!this.validateForm(formElement, formType)) {
      return
    }

    // Set loading state
    this.setFormState(formType, { isSubmitting: true, errors: {}, success: false })

    try {
      const formData = new FormData(formElement)
      
      // Handle different form types using existing API
      switch (formType) {
        case 'newsletter':
          await this.handleNewsletterSubmission(formData, formElement)
          break
        case 'contact':
          await this.handleContactSubmission(formData, formElement)
          break
        default:
          await this.handleGenericSubmission(formData, formElement, formType)
      }

      // Success
      this.setFormState(formType, { 
        isSubmitting: false, 
        success: true, 
        message: 'Success! Thank you for your submission.' 
      })

      // Reset form
      formElement.reset()

      // Track analytics
      this.trackFormSubmission(formType)

    } catch (error: any) {
      console.error(`Form submission error (${formType}):`, error)
      
      this.setFormState(formType, { 
        isSubmitting: false, 
        success: false,
        message: error.message || 'Something went wrong. Please try again.' 
      })
    }
  }

  private async handleNewsletterSubmission(
    formData: FormData, 
    form: HTMLFormElement
  ): Promise<void> {
    const email = formData.get('email') as string
    
    // Use existing API client
    await this.api.newsletter.subscribe({ email })
    
    // Show newsletter confirmation modal
    this.showNewsletterModal(email)
  }

  private async handleContactSubmission(
    formData: FormData, 
    form: HTMLFormElement
  ): Promise<void> {
    const data = Object.fromEntries(formData.entries())
    
    // Use existing API client
    await this.api.contacts.create(data)
  }

  private async handleGenericSubmission(
    formData: FormData, 
    form: HTMLFormElement,
    formType: string
  ): Promise<void> {
    // For other form types, could extend API client or use fetch
    const endpoint = form.dataset.endpoint || `/api/${formType}`
    const data = Object.fromEntries(formData.entries())
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Submission failed')
    }
  }

  private validateForm(form: HTMLFormElement, formType: string): boolean {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]')
    let isValid = true
    const errors: Record<string, string> = {}

    inputs.forEach(input => {
      const field = input as HTMLInputElement
      const error = this.validateField(field, formType, false)
      if (error) {
        errors[field.name || field.id] = error
        isValid = false
      }
    })

    if (!isValid) {
      this.setFormState(formType, { errors })
    }

    return isValid
  }

  private validateField(
    field: HTMLInputElement, 
    formType: string, 
    showError: boolean = true
  ): string | null {
    const value = field.value.trim()
    let error: string | null = null

    // Required validation
    if (field.hasAttribute('required')) {
      error = this.validators.required(value)
    }
    
    // Type-specific validation using existing validators
    if (!error && value) {
      switch (field.type) {
        case 'email':
          error = this.validators.email(value)
          break
        case 'tel':
          error = this.validators.phone(value)
          break
        case 'url':
          error = this.validators.url(value)
          break
      }

      // Length validation
      const minLength = field.getAttribute('minlength')
      if (!error && minLength) {
        error = this.validators.minLength(parseInt(minLength))(value)
      }

      const maxLength = field.getAttribute('maxlength')
      if (!error && maxLength) {
        error = this.validators.maxLength(parseInt(maxLength))(value)
      }
    }

    if (showError) {
      if (error) {
        this.showFieldError(field, error)
      } else {
        this.clearFieldError(field, formType)
      }
    }

    return error
  }

  private showFieldError(field: HTMLInputElement, message: string): void {
    this.clearFieldError(field, '')
    
    field.classList.add('border-red-500', 'bg-red-50')
    
    const errorElement = document.createElement('div')
    errorElement.className = 'form-error text-red-600 text-sm mt-1'
    errorElement.textContent = message
    errorElement.setAttribute('role', 'alert')
    
    field.parentNode?.insertBefore(errorElement, field.nextSibling)
  }

  private clearFieldError(field: HTMLInputElement, formType: string): void {
    field.classList.remove('border-red-500', 'bg-red-50')
    const existingError = field.parentNode?.querySelector('.form-error')
    existingError?.remove()
    
    const formState = this.forms.get(formType)
    if (formState && formState.errors[field.name || field.id]) {
      delete formState.errors[field.name || field.id]
      this.setFormState(formType, formState)
    }
  }

  private setFormState(formType: string, updates: Partial<FormState>): void {
    const currentState = this.forms.get(formType) || {
      isSubmitting: false,
      errors: {},
      success: false
    }
    
    const newState = { ...currentState, ...updates }
    this.forms.set(formType, newState)
    this.updateFormUI(formType, newState)
  }

  private updateFormUI(formType: string, state: FormState): void {
    const form = document.querySelector(`form[data-form="${formType}"]`) as HTMLFormElement
    if (!form) return

    // Update submit button
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
    if (submitButton) {
      submitButton.disabled = state.isSubmitting
      
      if (state.isSubmitting) {
        submitButton.classList.add('opacity-50', 'cursor-not-allowed')
        const originalText = submitButton.dataset.originalText || submitButton.textContent
        submitButton.dataset.originalText = originalText || ''
        submitButton.textContent = 'Submitting...'
      } else {
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed')
        const originalText = submitButton.dataset.originalText
        if (originalText) {
          submitButton.textContent = originalText
        }
      }
    }

    // Update form message
    const messageElement = form.querySelector('.form-message')
    if (messageElement && state.message) {
      messageElement.textContent = state.message
      messageElement.className = `form-message ${
        state.success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
      } p-3 rounded-lg text-sm mt-4`
      messageElement.classList.remove('hidden')
    }
  }

  private setupModals(): void {
    const modal = document.getElementById('newsletter-modal')
    const okButton = document.getElementById('modal-ok-button')
    
    if (modal && okButton) {
      this.addListener(okButton, 'click', () => this.closeNewsletterModal())
      this.addListener(modal, 'click', (e) => {
        if (e.target === modal) this.closeNewsletterModal()
      })
      this.addListener(document, 'keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeNewsletterModal()
        }
      })
    }
  }

  private showNewsletterModal(email: string): void {
    const modal = document.getElementById('newsletter-modal')
    const confirmedEmail = document.getElementById('confirmed-email')
    const modalContent = document.getElementById('modal-content')
    
    if (modal && confirmedEmail && modalContent) {
      confirmedEmail.textContent = email
      modal.classList.remove('hidden')
      
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0')
        modalContent.classList.add('scale-100', 'opacity-100')
      }, 10)
    }
  }

  private closeNewsletterModal(): void {
    const modal = document.getElementById('newsletter-modal')
    const modalContent = document.getElementById('modal-content')
    
    if (modal && modalContent) {
      modalContent.classList.add('scale-95', 'opacity-0')
      modalContent.classList.remove('scale-100', 'opacity-100')
      
      setTimeout(() => {
        modal.classList.add('hidden')
      }, 300)
    }
  }

  private trackFormSubmission(formType: string): void {
    const systemManager = window.systemManager
    const analyticsManager = systemManager?.getModule('analytics')
    
    if (analyticsManager?.isEnabled()) {
      analyticsManager.trackEvent('form_submit', 'engagement', formType)
    }
  }

  // Public API
  public getFormState(formType: string): FormState | null {
    return this.forms.get(formType) || null
  }

  public resetForm(formType: string): void {
    this.setFormState(formType, {
      isSubmitting: false,
      errors: {},
      success: false,
      message: undefined
    })
  }
}