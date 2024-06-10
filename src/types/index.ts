import {z} from 'zod';

// Projects schema

export const Project = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof Project>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' |'description'>