import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Todo from './Todo';

describe('Todo', () => {
  it('renders with no todos initially', () => {
    render(<Todo />);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('adds a new todo item', async () => {
    render(<Todo />);
    const input = screen.getByLabelText('New Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    await userEvent.type(input, 'Learn React');
    await userEvent.click(addButton);

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Input should be cleared
  });

  it('toggles a todo item completion status', async () => {
    render(<Todo />);
    const input = screen.getByLabelText('New Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    await userEvent.type(input, 'Learn Testing');
    await userEvent.click(addButton);

    const todoItem = screen.getByText('Learn Testing');
    const checkbox = screen.getByRole('checkbox', { name: 'Learn Testing' });

    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(todoItem).toHaveStyle('text-decoration: line-through');
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox); // Toggle back

    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    expect(checkbox).not.toBeChecked();
  });

  it('removes a todo item', async () => {
    render(<Todo />);
    const input = screen.getByLabelText('New Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    await userEvent.type(input, 'Delete me');
    await userEvent.click(addButton);

    expect(screen.getByText('Delete me')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: 'delete' });
    await userEvent.click(deleteButton);

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('does not add an empty todo', async () => {
    render(<Todo />);
    const addButton = screen.getByRole('button', { name: 'Add' });

    await userEvent.click(addButton); // Try to add empty todo

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
