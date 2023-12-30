import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Friend from "./Friend";
import Postbar from "./Postbar";
import ProfileTab from "./ProfileTab";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/index.scss';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        // If no auth token, redirect to the login page
        navigate('/login');
      } else {
        // Simulate an asynchronous check (replace with an actual check)
        setTimeout(() => {
          setLoading(false);
        },500);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="container-fluid">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          <div className="sidebarmain col-lg-1 p-0 m-0">
            <Sidebar onTabChange={handleTabChange} />
          </div>

          <div className="activetabmain col-lg-3 p-0 m-0">
            <ProfileTab activeTab={activeTab} />
          </div>

          <div className="postbarmain col-lg-5 p-0 m-0">
            <Postbar activeTab={activeTab} />
          </div>

          <div className="friendmain col-lg-3 p-0 m-0">
            <Friend activeTab={activeTab} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
