import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [surveyData, setSurveyData] = useState([]);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const addData = () => {
    if (label && value) {
      setSurveyData([...surveyData, { label, value: parseInt(value) }]);
      setLabel('');
      setValue('');
    }
  };

  const data = {
    labels: surveyData.map(item => item.label), // Labels array defines the x-axis categories for each data point
    datasets: [
      {
        label: 'Survey Results',
        data: surveyData.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart of Survey Results',
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>EXperiment10: Chart.js Integration</h1>
      <h2>Add Survey Data</h2>
      <input
        type="text"
        placeholder="Label (e.g., Option A)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Value (e.g., 10)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addData}>Add</button>
      <h2>Bar Chart</h2>
      {/* 
        Review Question: How do you create a basic bar chart using Chart.js?
        Answer: In React with react-chartjs-2, import { Bar } from 'react-chartjs-2', register necessary components from 'chart.js',
        define data object with labels and datasets, and render <Bar data={data} options={options} />.
        For vanilla Chart.js, include Chart.js script, create a canvas element, and use new Chart(ctx, { type: 'bar', data, options }).
      */}
      <Bar data={data} options={options} />
      {/* 
        Review Question: What is the purpose of the labels array in a Chart.js dataset?
        Answer: The labels array defines the categories or labels for the x-axis, corresponding to each data point in the dataset.
        Each label matches a value in the data array of the dataset.
      */}
    </div>
  );
}

export default App;
