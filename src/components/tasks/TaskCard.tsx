import { Task } from "@/types/index";

type TaskCardProps = {
    task:  Task;
};


export default function TaskCard({task}: TaskCardProps) {
  return (
    <div>{task.name}</div>
  )
}
