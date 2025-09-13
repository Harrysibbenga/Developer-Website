// src/utils/api.ts
/**
 * HTTP client for backend API communication
 * Handles requests, responses, errors, and provides typed endpoints
 */

import type {
    BookingCreate,
    BookingResponse,
    BookingList,
    BookingUpdate,
    BookingStatusUpdate,
    ContactCreate,
    ContactResponse,
    ContactList,
    NewsletterSubscribe,
    NewsletterResponse,
    AdminStats,
    BookingSummary,
    ContactSummary,
    ActivityLog,
    ApiResponse,
    ApiError,
    PaginationParams,
    FilterParams,
    ValidationError
  } from '../types/api';
  
  // ===== CONFIGURATION =====
  
  interface ApiConfig {
    baseUrl: string;
    timeout: number;
    retries: number;
    headers: Record<string, string>;
  }
  
  const defaultConfig: ApiConfig = {
    baseUrl: import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:8000',
    timeout: 10000,
    retries: 3,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  // ===== HTTP CLIENT CLASS =====
  
  class HttpClient {
    private config: ApiConfig;
  
    constructor(config: Partial<ApiConfig> = {}) {
      this.config = { ...defaultConfig, ...config };
    }
  
    private async request<T>(
      endpoint: string,
      options: RequestInit = {},
      retryCount = 0
    ): Promise<T> {
      const url = `${this.config.baseUrl}${endpoint}`;
      
      const requestOptions: RequestInit = {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers
        }
      };
  
      // Add timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      requestOptions.signal = controller.signal;
  
      try {
        console.log(`API Request: ${options.method || 'GET'} ${url}`);
        
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);
  
        if (!response.ok) {
          await this.handleErrorResponse(response);
        }
  
        const data = await response.json();
        console.log(`API Response: ${response.status}`, data);
        
        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
  
        // Retry logic for network errors
        if (retryCount < this.config.retries && this.shouldRetry(error)) {
          console.log(`Retrying request (${retryCount + 1}/${this.config.retries})`);
          await this.delay(1000 * Math.pow(2, retryCount)); // Exponential backoff
          return this.request<T>(endpoint, options, retryCount + 1);
        }
  
        throw error;
      }
    }
  
    private async handleErrorResponse(response: Response): Promise<never> {
      let errorData: ApiError;
      
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          detail: `HTTP ${response.status}: ${response.statusText}`
        };
      }
  
      const error = new Error(errorData.detail || 'An error occurred');
      (error as any).status = response.status;
      (error as any).code = errorData.code;
      (error as any).field = errorData.field;
      
      throw error;
    }
  
    private shouldRetry(error: any): boolean {
      // Retry on network errors, timeouts, and 5xx server errors
      return (
        error.name === 'TypeError' || // Network error
        error.name === 'AbortError' || // Timeout
        (error.status && error.status >= 500) // Server error
      );
    }
  
    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    // HTTP method helpers
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
      return this.request<T>(url, { method: 'GET' });
    }
  
    async post<T>(endpoint: string, data?: any): Promise<T> {
      return this.request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      });
    }
  
    async put<T>(endpoint: string, data?: any): Promise<T> {
      return this.request<T>(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      });
    }
  
    async patch<T>(endpoint: string, data?: any): Promise<T> {
      return this.request<T>(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined
      });
    }
  
    async delete<T>(endpoint: string): Promise<T> {
      return this.request<T>(endpoint, { method: 'DELETE' });
    }
  }
  
  // ===== API CLIENT =====
  
  export class ApiClient {
    private http: HttpClient;
  
    constructor(config?: Partial<ApiConfig>) {
      this.http = new HttpClient(config);
    }
  
    // ===== BOOKING ENDPOINTS =====
  
    bookings = {
      // List bookings with optional filters and pagination
      list: async (params?: PaginationParams & FilterParams): Promise<BookingList> => {
        return this.http.get<BookingList>('/api/bookings/', params);
      },
  
      // Create a new booking
      create: async (data: BookingCreate): Promise<BookingResponse> => {
        return this.http.post<BookingResponse>('/api/bookings/', data);
      },
  
      // Get booking by ID
      getById: async (id: string): Promise<BookingResponse> => {
        return this.http.get<BookingResponse>(`/api/bookings/${id}`);
      },
  
      // Update booking
      update: async (id: string, data: Partial<BookingUpdate>): Promise<BookingResponse> => {
        return this.http.put<BookingResponse>(`/api/bookings/${id}`, data);
      },
  
      // Update booking status
      updateStatus: async (id: string, data: BookingStatusUpdate): Promise<BookingResponse> => {
        return this.http.patch<BookingResponse>(`/api/bookings/${id}/status`, data);
      },
  
      // Delete booking
      delete: async (id: string): Promise<void> => {
        return this.http.delete<void>(`/api/bookings/${id}`);
      }
    };
  
    // ===== CONTACT ENDPOINTS =====
  
    contacts = {
      // List contact inquiries
      list: async (params?: PaginationParams & FilterParams): Promise<ContactList> => {
        return this.http.get<ContactList>('/api/contact/', params);
      },
  
      // Create contact inquiry
      create: async (data: ContactCreate): Promise<ContactResponse> => {
        return this.http.post<ContactResponse>('/api/contact/', data);
      },
  
      // Get contact by ID
      getById: async (id: string): Promise<ContactResponse> => {
        return this.http.get<ContactResponse>(`/api/contact/${id}`);
      },
  
      // Update contact status
      updateStatus: async (id: string, status: string): Promise<ContactResponse> => {
        return this.http.patch<ContactResponse>(`/api/contact/${id}/status`, { status });
      },
  
      // Delete contact
      delete: async (id: string): Promise<void> => {
        return this.http.delete<void>(`/api/contact/${id}`);
      }
    };
  
    // ===== NEWSLETTER ENDPOINTS =====
  
    newsletter = {
      // Subscribe to newsletter
      subscribe: async (data: NewsletterSubscribe): Promise<NewsletterResponse> => {
        return this.http.post<NewsletterResponse>('/api/contact/newsletter', data);
      },
  
      // Unsubscribe from newsletter
      unsubscribe: async (email: string): Promise<void> => {
        return this.http.post<void>(`/api/contact/newsletter/unsubscribe?email=${encodeURIComponent(email)}`);
      },

      // confirm subscription
      confirm: async (email: string): Promise<NewsletterResponse> => {
        return this.http.post<NewsletterResponse>(`/api/contact/newsletter/confirm?email=${encodeURIComponent(email)}`);
      },
  
      // Get subscriber info
      getSubscriber: async (email: string): Promise<NewsletterResponse> => {
        return this.http.get<NewsletterResponse>(`/api/contact/newsletter/subscriber/${email}`);
      }
    };
  
    // ===== ADMIN ENDPOINTS =====
  
    admin = {
      // Get dashboard statistics
      getStats: async (): Promise<AdminStats> => {
        return this.http.get<AdminStats>('/api/admin/stats');
      },
  
      // Get booking summary
      getBookingSummary: async (params?: FilterParams): Promise<BookingSummary[]> => {
        return this.http.get<BookingSummary[]>('/api/admin/bookings/summary', params);
      },
  
      // Get contact summary
      getContactSummary: async (params?: FilterParams): Promise<ContactSummary[]> => {
        return this.http.get<ContactSummary[]>('/api/admin/contacts/summary', params);
      },
  
      // Get activity log
      getActivityLog: async (params?: PaginationParams): Promise<ActivityLog[]> => {
        return this.http.get<ActivityLog[]>('/api/admin/activity', params);
      }
    };
  
    // ===== HEALTH CHECK =====
  
    health = {
      check: async () => {
        return this.http.get<{
          status: string;
          timestamp: string;
          version: string;
          database: boolean;
          email_service: boolean;
        }>('/api/health/');
      }
    };
  }
  
  // ===== FORM UTILITIES =====
  
  export class FormHandler<T extends Record<string, any>> {
    private data: T;
    private errors: ValidationError[] = [];
    private loading = false;
    private submitted = false;
  
    constructor(initialData: T) {
      this.data = { ...initialData };
    }
  
    // Get current form state
    getState() {
      return {
        data: this.data,
        errors: this.errors,
        loading: this.loading,
        submitted: this.submitted
      };
    }
  
    // Update form data
    updateData(updates: Partial<T>) {
      this.data = { ...this.data, ...updates };
      this.clearFieldErrors(Object.keys(updates));
    }
  
    // Set field value
    setField(field: keyof T, value: any) {
      this.data[field] = value;
      this.clearFieldErrors([field as string]);
    }
  
    // Get field value
    getField(field: keyof T) {
      return this.data[field];
    }
  
    // Set loading state
    setLoading(loading: boolean) {
      this.loading = loading;
    }
  
    // Set errors
    setErrors(errors: ValidationError[]) {
      this.errors = errors;
    }
  
    // Clear errors for specific fields
    clearFieldErrors(fields: string[]) {
      this.errors = this.errors.filter(error => !fields.includes(error.field));
    }
  
    // Clear all errors
    clearErrors() {
      this.errors = [];
    }
  
    // Get errors for a specific field
    getFieldErrors(field: string): string[] {
      return this.errors
        .filter(error => error.field === field)
        .map(error => error.message);
    }
  
    // Check if form has errors
    hasErrors(): boolean {
      return this.errors.length > 0;
    }
  
    // Check if field has errors
    hasFieldError(field: string): boolean {
      return this.errors.some(error => error.field === field);
    }
  
    // Submit form with async handler
    async submit<R>(handler: (data: T) => Promise<R>): Promise<R | null> {
      this.loading = true;
      this.submitted = true;
      this.clearErrors();
  
      try {
        const result = await handler(this.data);
        return result;
      } catch (error: any) {
        // Handle validation errors
        if (error.status === 422 && error.details) {
          const validationErrors: ValidationError[] = error.details.map((detail: any) => ({
            field: detail.loc[detail.loc.length - 1],
            message: detail.msg
          }));
          this.setErrors(validationErrors);
        } else {
          // Handle general errors
          this.setErrors([{
            field: 'general',
            message: error.message || 'An unexpected error occurred'
          }]);
        }
        return null;
      } finally {
        this.loading = false;
      }
    }
  
    // Reset form
    reset(initialData?: T) {
      if (initialData) {
        this.data = { ...initialData };
      }
      this.errors = [];
      this.loading = false;
      this.submitted = false;
    }
  }
  
  // ===== SINGLETON INSTANCE =====
  
  export const api = new ApiClient();
  
  // ===== UTILITY FUNCTIONS =====
  
  export function createFormHandler<T extends Record<string, any>>(initialData: T) {
    return new FormHandler(initialData);
  }
  
  export function isApiError(error: any): error is ApiError {
    return error && typeof error.detail === 'string';
  }
  
  export function handleApiError(error: any): string {
    if (isApiError(error)) {
      return error.detail;
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  }
  
  // ===== VALIDATION HELPERS =====
  
  export const validators = {
    email: (value: string): string | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Please enter a valid email address';
    },
  
    phone: (value: string): string | null => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(value.replace(/\s/g, '')) ? null : 'Please enter a valid phone number';
    },
  
    required: (value: any): string | null => {
      return value && value.toString().trim() ? null : 'This field is required';
    },
  
    minLength: (min: number) => (value: string): string | null => {
      return value && value.length >= min ? null : `Must be at least ${min} characters`;
    },
  
    maxLength: (max: number) => (value: string): string | null => {
      return value && value.length <= max ? null : `Must be no more than ${max} characters`;
    },
  
    url: (value: string): string | null => {
      try {
        new URL(value);
        return null;
      } catch {
        return 'Please enter a valid URL';
      }
    }
  };
  
  export default api;