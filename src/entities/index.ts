/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: cleanlinessreports
 * Interface for CleanlinessReports
 */
export interface CleanlinessReports {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  violationImage?: string;
  /** @wixFieldType text */
  violationType?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType datetime */
  reportDateTime?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  severityScore?: number;
  /** @wixFieldType text */
  wasteClassification?: string;
}


/**
 * Collection ID: educationalresources
 * Interface for EducationalResources
 */
export interface EducationalResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  wasteType?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType url */
  externalLink?: string;
}


/**
 * Collection ID: inquiries
 * Interface for Inquiries
 */
export interface Inquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionTime?: Date | string;
}
