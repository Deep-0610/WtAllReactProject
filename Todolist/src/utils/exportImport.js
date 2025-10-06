export const exportToJSON = (todos) => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = 'todos.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportToCSV = (todos) => {
  const headers = ['ID', 'Text', 'Completed', 'Due Date', 'Priority', 'Category', 'Subtasks'];
  const csvContent = [
    headers.join(','),
    ...todos.map(todo => [
      todo.id,
      `"${todo.text.replace(/"/g, '""')}"`,
      todo.completed,
      todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
      todo.priority,
      `"${todo.category || ''}"`,
      `"${todo.subtasks.map(st => st.text).join('; ')}"`
    ].join(','))
  ].join('\n');

  const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);

  const exportFileDefaultName = 'todos.csv';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const todos = JSON.parse(e.target.result);
        resolve(todos);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const importFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');

        const todos = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            id: parseInt(values[0]),
            text: values[1].replace(/^"|"$/g, '').replace(/""/g, '"'),
            completed: values[2] === 'true',
            dueDate: values[3] ? new Date(values[3]) : null,
            priority: values[4],
            category: values[5].replace(/^"|"$/g, ''),
            subtasks: values[6] ? values[6].replace(/^"|"$/g, '').split('; ').map((text, index) => ({
              id: Date.now() + index,
              text: text.trim(),
              completed: false
            })) : []
          };
        });

        resolve(todos);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
