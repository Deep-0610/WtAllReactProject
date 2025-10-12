import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [dataPoints, setDataPoints] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Connect to Binance WebSocket for BTC/USDT ticker
    ws.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.c); // Close price
      const time = new Date().toLocaleTimeString();
      setDataPoints(prev => {
        const newPoints = [...prev, { time, price }];
        // Keep only last 20 points to avoid overcrowding
        return newPoints.slice(-20);
      });
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const data = {
    labels: dataPoints.map(point => point.time),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: dataPoints.map(point => point.price),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
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
        text: 'Real-Time Bitcoin Price Visualization',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
      marginBottom: '20px',
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Experiment11: Real-Time Data Visualization</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Receiving real-time Bitcoin price updates from Binance WebSocket. Chart updates live.
      </p>
      {dataPoints.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>Loading data...</p>
      )}
    </div>
  );
}

export default App;
