import {z} from 'zod';

// Projects schema

export const Project = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

// dashboard schema

export const Dashboard = z.array(
  Project.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  }),
);

export type Dashboard = z.infer<typeof Dashboard>;



export type Project = z.infer<typeof Project>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' |'description'>