import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
// import { useSelector } from "react-redux";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const pieChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/FarmOrder.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();

      const loadedOrders = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setOrders(loadedOrders);
    } catch (error) {
      console.log("Failed to fetch orders:", error);
    }
  };

  const getProductOrdersCount = () => {
    const productOrdersCount = {};

    orders.forEach((order) => {
      order.productNames.forEach((productName) => {
        if (productOrdersCount.hasOwnProperty(productName)) {
          productOrdersCount[productName]++;
        } else {
          productOrdersCount[productName] = 1;
        }
      });
    });

    return productOrdersCount;
  };

  useEffect(() => {
    const renderPieChart = () => {
      const productOrdersCount = getProductOrdersCount();
      const productNames = Object.keys(productOrdersCount);
      const orderCounts = Object.values(productOrdersCount);

      const chartData = {
        labels: productNames,
        datasets: [
          {
            data: orderCounts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#33cc33",
              "#9966ff",
              "#ff9933",
              "#ff66a3",
            ],
          },
        ],
      };

      const options = {
        plugins: {
          legend: {
            position: "right",
          },
        },
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy the previous chart instance
      }

      chartInstanceRef.current = new Chart(pieChartRef.current, {
        type: "pie",
        data: chartData,
        options: options,
      });
    };

    renderPieChart();
  }, [orders]);

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-heading">Dashboard</h1> */}
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>User: {order.allowedUser}</h3>
            <p>Name: {order.name}</p>
            <p>Phone Number: {order.phoneNumber}</p>

            <p>Order Date: {order.orderDate}</p>
          </div>
        ))}
      </div>
      <div className="pie-chart-container">
        <canvas className="canvas-pie-chart" ref={pieChartRef}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
