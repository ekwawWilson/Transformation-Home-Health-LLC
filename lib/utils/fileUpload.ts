import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'resumes');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/**
 * Ensure upload directory exists
 */
export async function ensureUploadDir(): Promise<void> {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Validate file type and size
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only PDF and DOC/DOCX files are allowed.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit.',
    };
  }

  return { valid: true };
}

/**
 * Generate unique filename
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  const sanitized = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitized}_${timestamp}_${random}${ext}`;
}

/**
 * Save uploaded file
 */
export async function saveFile(file: File): Promise<string> {
  await ensureUploadDir();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = generateUniqueFilename(file.name);
  const filepath = path.join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);

  return `/uploads/resumes/${filename}`;
}
