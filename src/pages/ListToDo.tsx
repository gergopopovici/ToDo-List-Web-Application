import React from 'react';
import { useQuery } from 'react-query';
import { getToDos } from '../services/ToDoService';
import { ToDo } from '../models/ToDo';
import ToDoCard from '../components/cards/ToDoCard';

function ListToDo() {
  const { data: todos, error, isLoading } = useQuery<ToDo[]>('todos', getToDos);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading toDos</div>;
  }

  return (
    <div>
      <h1>My ToDos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {todos?.map((todo) => (
          <ToDoCard key={todo.id} id={todo.id ?? 0} title={todo.title} date={todo.date} priority={todo.priority} />
        ))}
      </div>
    </div>
  );
}

export default ListToDo;
