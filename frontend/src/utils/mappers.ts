// src/utils/mappers.ts
import type { Project } from "./projects"
import {
  BookingResponse,
  ProjectStatus,
  ServiceType
} from "../types/api"

/**
 * Map API ProjectStatus enum → frontend Project["status"]
 */
function mapStatus(status: ProjectStatus): Project["status"] {
  switch (status) {
    case ProjectStatus.COMPLETED:
      return "live"
    case ProjectStatus.ACCEPTED:
    case ProjectStatus.IN_PROGRESS:
    case ProjectStatus.QUOTED:
      return "consultation"
    default:
      return "case-study"
  }
}

/**
 * Map API ServiceType enum → readable category label
 */
function mapCategory(service: ServiceType): string {
  switch (service) {
    case ServiceType.BUSINESS_WEBSITES:
      return "Business Websites"
    case ServiceType.WEB_APPLICATIONS:
      return "Web Applications"
    case ServiceType.DATA_AUTOMATION:
      return "Data Automation"
    case ServiceType.DIGITAL_TRANSFROMATION:
      return "Digital Transformation"
    case ServiceType.CONSULTATION:
      return "Consultation"
    default:
      return "Other"
  }
}

/**
 * Map a backend BookingResponse → frontend Project
 */
export function bookingToProject(b: BookingResponse): Project {
  return {
    id: b.booking_id,
    title: b.project_name,
    description: b.description,
    longDescription: b.additional_info || b.description,
    category: mapCategory(b.service_type),
    technologies: b.technologies || [],
    status: mapStatus(b.status),
    image: "/images/placeholders/project.png", // fallback placeholder
    liveUrl: b.website || undefined,
    githubUrl: undefined, // backend doesn’t supply this
    features: b.features || [],
    challenges: [],
    results: [],
    client: b.company || `${b.first_name} ${b.last_name}`,
    duration: b.estimated_duration || b.timeline || "",
    year: new Date(b.created_at).getFullYear(),
    featured: false
  }
}

/**
 * Map multiple bookings → projects
 */
export function bookingsToProjects(list: BookingResponse[]): Project[] {
  return list.map(bookingToProject)
}
