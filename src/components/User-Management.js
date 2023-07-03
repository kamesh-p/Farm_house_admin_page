import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import { Pie } from "react-chartjs-2";

const UserManagement = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [feedbackDetails, setFeedbackDetails] = useState([]);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showsubDialog, setShowsubDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedsubscrip, setseletedSubscrip] = useState([]);
  const [newFeedbackCount, setNewFeedbackCount] = useState(0); // New feedback count
  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/allowedUsers.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const userData = await response.json();

      // Fetch feedback details
      const feedbackResponse = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Feedback.json"
      );
      if (!feedbackResponse.ok) {
        throw new Error("Failed to fetch feedback data.");
      }
      const feedbackData = await feedbackResponse.json();
      const subscriptionResponse = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Subscription.json"
      );
      if (!subscriptionResponse.ok) {
        throw new Error("Failed to fetch subscription data.");
      }

      const subscriptionData = await subscriptionResponse.json();
      const userArray = Object.entries(userData).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      const feedbackArray = Object.entries(feedbackData).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );
      const subscriptionArray = Object.entries(subscriptionData).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );

      setUsers(userArray);
      setFeedbackDetails(feedbackArray);
      setSubscriptions(subscriptionArray);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("totalsub", subscriptions);
  // Delete user from the API
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://add-to-card-a30ca-default-rtdb.firebaseio.com/allowedUsers/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch orders from the API
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

  // Handle user button click
  const handleUserButtonClick = (user) => {
    setSelectedUser(user);
    const userFilteredOrders = orders.filter(
      (order) => order.allowedUser === user
    );
    setUserOrders(userFilteredOrders);

    // Calculate product frequency
    const productFrequency = {};
    userFilteredOrders.forEach((order) => {
      order.productNames.forEach((productName) => {
        productFrequency[productName] =
          (productFrequency[productName] || 0) + 1;
      });
    });

    // Convert product frequency to chart data
    const chartData = {
      labels: Object.keys(productFrequency),
      datasets: [
        {
          data: Object.values(productFrequency),
        },
      ],
    };

    setChartData(chartData);

    setShowDialog(true);
  };

  // Handle feedback button click
  const handleFeedbackButtonClick = (name) => {
    console.log("Clicked Feedback Button:", name);
    const filteredFeedback = feedbackDetails.filter(
      (feedback) => feedback.user === name
    );
    console.log("Filtered Feedback:", filteredFeedback);

    // Set the selected feedback for display
    setSelectedFeedback(filteredFeedback);

    // Show the feedback dialog
    setShowFeedbackDialog(true);
  };

  // Handle subscription button click
  const handleSubscriptionButtonClick = (name) => {
    console.log("Clicked Subscription Button:", name);
    const filteredSubscription = subscriptions.filter(
      (sub) => sub.allowedUser === name
    );
    console.log("Filtered Subscription:", filteredSubscription);
    setseletedSubscrip(filteredSubscription);
    setShowsubDialog(true);
  };

  // Close the dialog
  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="user-management-container">
      <h2 className="user-management-heading">User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Order Details</th>
            <th>Feedback</th>
            <th>Subscriptions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>******</td>

              <td>
                <button
                  className="btn-user-management-info"
                  onClick={() => handleUserButtonClick(user.name)}
                >
                  View Details
                </button>
              </td>
              <td>
                {feedbackDetails.some(
                  (feedback) => feedback.user === user.name
                ) ? (
                  <button
                    className="btn-user-management-feedback"
                    onClick={() => handleFeedbackButtonClick(user.name)}
                  >
                    Feedback
                  </button>
                ) : (
                  <span className="no-text-message">No feedback</span>
                )}
              </td>
              <td>
                {subscriptions.some((sub) => sub.allowedUser === user.name) ? (
                  <button
                    className="btn-user-management-subscription"
                    onClick={() => handleSubscriptionButtonClick(user.name)}
                  >
                    Subscription
                  </button>
                ) : (
                  <span className="no-text-message">No subscriptions</span>
                )}
              </td>
              <td>
                <button
                  className="btn-user-management-cancel"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <div className="dialog-container">
          <div className="dialog">
            <h3 className="dialog-h3">Orders for {selectedUser}</h3>

            <div className="chart-container">
              {chartData && <Pie data={chartData} />}
            </div>
            <ul className="order-list">
              {userOrders.map((order) => (
                <li key={order.id}>
                  <div>
                    <p>Name: {order.name}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Total Price: ₹{order.totalPrice}</p>
                    <div className="product-list">
                      <h4>Products:</h4>
                      <ul>
                        {order.productNames.map((productName, index) => (
                          <li key={index}>{productName}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="cancel-button" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
      {showFeedbackDialog && selectedFeedback && (
        <div className="dialog-container">
          <div className="dialog">
            <h3 className="dialog-h3">
              Feedback By {selectedFeedback[0].user}
            </h3>
            {selectedFeedback.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <p>Classification: {feedback.classification}</p>
                <p>Feedback: {feedback.feedback}</p>
              </div>
            ))}
            <button
              className="cancel-button"
              onClick={() => setShowFeedbackDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showsubDialog && selectedsubscrip && (
        <div className="dialog-container">
          <div className="dialog">
            <h3 className="dialog-h3">
              Milk Subscription By {selectedsubscrip[0].allowedUser}
            </h3>
            {selectedsubscrip.map((sub) => (
              <div key={sub.id} className="subscriptions-item">
                <p>Start Date : {sub.startDate}</p>
                <p>End Date : {sub.endDate}</p>
                <p>Total Days : {sub.totalDays}</p>
                <p>Quantity : {sub.productQua}</p>
                <p className="sub-amount-totaL">
                  Total Price : {sub.totalPrice}
                </p>
              </div>
            ))}
            <button
              className="cancel-button"
              onClick={() => setShowsubDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
