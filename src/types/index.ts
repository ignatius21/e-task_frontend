import {z} from 'zod';


// Auth & Users
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string().min(6),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation' >;
export type ConfirmToken = Pick<Auth,'token'>;
export type RequestConfirmationCodeForm = Pick<Auth,'email'>;
export type ForgotPasswordForm = Pick<Auth,'email'>;
export type NewPasswordForm = Pick<Auth,'password' | 'password_confirmation'>;
export type UpdateCurrentPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;


// Users

export const userSchema = authSchema.pick({
  name: true,
  email: true,
}).extend({
  _id: z.string(),
});

export type User = z.infer<typeof userSchema>;

export type UserProfileForm = Pick<User, 'name' | 'email'>;


// Task schema
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema,
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;



// Projects schema

export const Project = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(userSchema.pick({ _id: true })),
});

// dashboard schema

export const Dashboard = z.array(
  Project.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  }),
);
export type Dashboard = z.infer<typeof Dashboard>;

export const editProjectSchema = Project.pick({
  projectName: true,
  clientName: true,
  description: true,
  manager: true,
  tasks: true,
});

export type Project = z.infer<typeof Project>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' |'description'>


// Team schema

const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});

export const teamMemersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;