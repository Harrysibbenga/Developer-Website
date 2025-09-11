// src/types/api.ts
/**
 * TypeScript definitions for backend API data structures
 * These types match the Pydantic schemas from the FastAPI backend
 */

// ===== ENUMS =====

export enum ServiceType {
    BUSINESS_WEBSITES = "businessWebsites",
    WEB_APPLICATIONS = "webApplications",
    DATA_AUTOMATION = "dataAutomation", 
    DIGITAL_TRANSFROMATION = "digitalTransformation",
    CONSULTATION = "technicalConsulting"
  }
  
  export enum ProjectStatus {
    PENDING = "pending",
    REVIEWED = "reviewed",
    QUOTED = "quoted",
    ACCEPTED = "accepted",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
  }
  
  export enum ProjectComplexity {
    SIMPLE = "simple",
    MEDIUM = "medium",
    COMPLEX = "complex"
  }
  
  export enum InquiryType {
    GENERAL = "general",
    TECHNICAL = "technical",
    PARTNERSHIP = "partnership",
    COLLABORATION = "collaboration",
    SUPPORT = "support",
    MEDIA = "media"
  }
  
  export enum InquiryStatus {
    NEW = "new",
    READ = "read",
    REPLIED = "replied",
    RESOLVED = "resolved",
    SPAM = "spam"
  }
  
  // ===== BASE INTERFACES =====
  
  export interface BaseModel {
    id: string;
    created_at: string;
    updated_at: string;
  }
  
  // ===== BOOKING INTERFACES =====
  
  export interface BookingCreate {
    service_type: ServiceType;
    project_name: string;
    description: string;
    timeline: string;
    budget_range: string;
    technologies?: string[];
    features?: string[];
    additional_info?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;
  }
  
  export interface BookingUpdate {
    project_name?: string;
    description?: string;
    timeline?: string;
    budget_range?: string;
    technologies?: string[];
    features?: string[];
    additional_info?: string;
    status?: ProjectStatus;
    complexity?: ProjectComplexity;
    estimated_cost?: number;
    estimated_duration?: string;
    notes?: string;
  }
  
  export interface BookingStatusUpdate {
    status: ProjectStatus;
    notes?: string;
    estimated_cost?: number;
    estimated_duration?: string;
  }
  
  export interface BookingResponse extends BaseModel {
    booking_id: string;
    service_type: ServiceType;
    project_name: string;
    description: string;
    timeline: string;
    budget_range: string;
    technologies: string[];
    features: string[];
    additional_info?: string;
    status: ProjectStatus;
    complexity?: ProjectComplexity;
    estimated_cost?: number;
    estimated_duration?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;
    ip_address?: string;
    user_agent?: string;
    notes?: string;
    is_spam: boolean;
    spam_score: number;
    quoted_at?: string;
    started_at?: string;
    completed_at?: string;
  }
  
  export interface BookingList {
    bookings: BookingResponse[];
    total: number;
    page: number;
    per_page: number;
    pages: number;
  }
  
  // ===== CONTACT INTERFACES =====
  
  export interface ContactCreate {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
    inquiry_type: InquiryType;
    subject: string;
    message: string;
    preferred_contact_method?: string;
  }
  
  export interface ContactResponse extends BaseModel {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
    inquiry_type: InquiryType;
    subject: string;
    message: string;
    preferred_contact_method?: string;
    status: InquiryStatus;
    ip_address?: string;
    user_agent?: string;
    is_spam: boolean;
    spam_score: number;
    replied_at?: string;
    resolved_at?: string;
  }
  
  export interface ContactList {
    contacts: ContactResponse[];
    total: number;
    page: number;
    per_page: number;
    pages: number;
  }
  
  // ===== NEWSLETTER INTERFACES =====
  
  export interface NewsletterSubscribe {
    email: string;
    first_name?: string;
    interests?: string[];
  }
  
  export interface NewsletterResponse extends BaseModel {
    email: string;
    first_name?: string;
    interests: string[];
    is_active: boolean;
    confirmed_at?: string;
    unsubscribed_at?: string;
  }
  
  // ===== ADMIN INTERFACES =====
  
  export interface BookingStats {
    total_bookings: number;
    pending_bookings: number;
    active_projects: number;
    completed_projects: number;
    total_revenue: number;
    average_project_value: number;
    conversion_rate: number;
  }
  
  export interface ContactStats {
    total_inquiries: number;
    new_inquiries: number;
    pending_replies: number;
    resolved_inquiries: number;
    spam_detected: number;
    response_rate: number;
    average_response_time: number;
  }
  
  export interface RevenueStats {
    monthly_revenue: number;
    quarterly_revenue: number;
    yearly_revenue: number;
    revenue_growth: number;
    top_services: Array<{
      service_type: ServiceType;
      revenue: number;
      count: number;
    }>;
  }
  
  export interface AdminStats {
    booking_stats: BookingStats;
    contact_stats: ContactStats;
    revenue_stats: RevenueStats;
    recent_activity: ActivityLog[];
  }
  
  export interface BookingSummary {
    booking_id: string;
    project_name: string;
    client_name: string;
    service_type: ServiceType;
    status: ProjectStatus;
    estimated_cost?: number;
    created_at: string;
  }
  
  export interface ContactSummary {
    id: string;
    name: string;
    email: string;
    inquiry_type: InquiryType;
    status: InquiryStatus;
    created_at: string;
  }
  
  export interface ActivityLog {
    id: string;
    type: 'booking' | 'contact' | 'system';
    action: string;
    description: string;
    metadata?: Record<string, any>;
    created_at: string;
  }
  
  // ===== API RESPONSE WRAPPERS =====
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface ApiError {
    detail: string;
    code?: string;
    field?: string;
  }
  
  export interface PaginationParams {
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }
  
  export interface FilterParams {
    status?: ProjectStatus | InquiryStatus;
    service_type?: ServiceType;
    inquiry_type?: InquiryType;
    date_from?: string;
    date_to?: string;
    search?: string;
  }
  
  // ===== UTILITY TYPES =====
  
  export type CreateBookingPayload = BookingCreate;
  export type UpdateBookingPayload = Partial<BookingUpdate>;
  export type CreateContactPayload = ContactCreate;
  export type SubscribeNewsletterPayload = NewsletterSubscribe;
  
  // ===== API ENDPOINT TYPES =====
  
  export interface BookingEndpoints {
    list: (params?: PaginationParams & FilterParams) => Promise<BookingList>;
    create: (data: CreateBookingPayload) => Promise<BookingResponse>;
    getById: (id: string) => Promise<BookingResponse>;
    update: (id: string, data: UpdateBookingPayload) => Promise<BookingResponse>;
    updateStatus: (id: string, data: BookingStatusUpdate) => Promise<BookingResponse>;
    delete: (id: string) => Promise<void>;
  }
  
  export interface ContactEndpoints {
    list: (params?: PaginationParams & FilterParams) => Promise<ContactList>;
    create: (data: CreateContactPayload) => Promise<ContactResponse>;
    getById: (id: string) => Promise<ContactResponse>;
    updateStatus: (id: string, status: InquiryStatus) => Promise<ContactResponse>;
    delete: (id: string) => Promise<void>;
  }
  
  export interface NewsletterEndpoints {
    subscribe: (data: SubscribeNewsletterPayload) => Promise<NewsletterResponse>;
    unsubscribe: (email: string) => Promise<void>;
    getSubscriber: (email: string) => Promise<NewsletterResponse>;
  }
  
  export interface AdminEndpoints {
    getStats: () => Promise<AdminStats>;
    getBookingSummary: (params?: FilterParams) => Promise<BookingSummary[]>;
    getContactSummary: (params?: FilterParams) => Promise<ContactSummary[]>;
    getActivityLog: (params?: PaginationParams) => Promise<ActivityLog[]>;
  }
  
  export interface HealthEndpoint {
    check: () => Promise<{
      status: string;
      timestamp: string;
      version: string;
      database: boolean;
      email_service: boolean;
    }>;
  }
  
  // ===== FORM VALIDATION TYPES =====
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
  export interface FormState<T> {
    data: T;
    errors: ValidationError[];
    loading: boolean;
    submitted: boolean;
  }
  
  // ===== CONFIGURATION TYPES =====
  
  export interface ApiConfig {
    baseUrl: string;
    timeout: number;
    retries: number;
    headers: Record<string, string>;
  }
  
  export interface EmailConfig {
    enabled: boolean;
    provider: string;
    templates: Record<string, string>;
  }