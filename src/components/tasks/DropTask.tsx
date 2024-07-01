import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string;
}

export default function DropTask({status}: DropTaskProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: status,
    });
  return (
    <div className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
    ref={setNodeRef}
    style={{
        backgroundColor: isOver ? "rgba(0,0,0,0.1)" : undefined,
    }}
    >
        Soltar Tarea Aqui - {status}
    </div>
  )
}
