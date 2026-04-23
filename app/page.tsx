import Todo from "@/components/Todo";
import { mockTodos } from "@/utils/mockTodo";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-center text-4xl">Todo tracker</h1>
      <p className="text-center text-gray-500">Track your tasks and stay organized</p>
      <div className="flex flex-col items-center gap-5 mt-5">
        {mockTodos.map((todo) => (
          <Todo key={todo.id} title={todo.title} description={todo.description} createdAt={todo.createdAt} />
        ))}
      </div>
    </div>
  );
}
