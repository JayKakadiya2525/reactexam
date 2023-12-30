import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, UncontrolledTooltip, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import Logo from '../assets/Millie.png';
import { RiUser2Line, RiSettings2Line, RiHome2Line, RiChat2Line } from 'react-icons/ri';
import { useDarkMode } from './DarkModeContext';
import '../assets/css/index.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { MDBCardImage } from 'mdb-react-ui-kit';


function Sidebar({ onTabChange }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('id');
    localStorage.removeItem('userUuid');
    navigate('/login');
  };

  return (
    <React.Fragment>
      <div className={`side-menu flex-lg-column me-lg-1 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

        {/* Logo */}
        <div className="navbar-brand-box">
          {/* <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={Logo} alt="logo" height="50" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={Logo} alt="logo" height="50" />
            </span>
          </Link> */}

        </div>
        {/* End navbar-brand-box */}

        <div className="flex-lg-column my-auto">
          <Nav className="side-menu-nav nav-pills flex-lg-column justify-content-center" role="tablist">

            <button className='btn btn-danger' onClick={handleLogoutClick}> Log out</button>

            <NavItem id="home">
              <NavLink id="pills-user-tab" className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
                <RiHome2Line className="nav-icon" />
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="home" placement="top">
              Home
            </UncontrolledTooltip>

            <NavItem id="chat">
              <NavLink id="pills-user-tab" className={activeTab === 'chat' ? 'active' : ''} onClick={() => handleTabClick('chat')}>
                <RiChat2Line className="nav-icon" />
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="chat" placement="top">
              Chat
            </UncontrolledTooltip>

            <NavItem id="profile">
              <NavLink id="pills-user-tab" className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>
                <RiUser2Line className="nav-icon" />
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="profile" placement="top">
              Profile
            </UncontrolledTooltip>

            <NavItem id="post">
              <NavLink id="pills-post-tab" className={activeTab === 'post' ? 'active' : ''} onClick={() => handleTabClick('post')}>
                <FaPlusCircle className="nav-icon" />
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="post" placement="top">
              New Post
            </UncontrolledTooltip>

            <NavItem id="setting">
              <NavLink id="pills-setting-tab" className={activeTab === 'setting' ? 'active' : ''} onClick={() => handleTabClick('setting')}>
                <RiSettings2Line className="nav-icon" />
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="setting" placement="top">
              Settings
            </UncontrolledTooltip>

            {/* Dropdown for profile picture (visible on small screens) */}
            <Dropdown nav isOpen={isOpen} toggle={toggleDropdown} className="profile-user-dropdown d-inline-block d-lg-none dropup">
              <DropdownToggle nav onClick={toggleDropdown}>
                <img src={Logo} alt="chatvia" className="profile-user rounded-circle" />
              </DropdownToggle>
              {/* <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Profile <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                <DropdownItem>Setting <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  className="dropdown-item"
                >
                  Log out <i className="ri-logout-circle-r-line float-end text-muted"></i>
                </DropdownItem>

              </DropdownMenu> */}
            </Dropdown>
          </Nav>
        </div>
        {/* End side-menu nav */}

        {/* Sidebar for Larger Screens */}
        <div className="flex-lg-column d-none d-lg-block">
          <Nav className="side-menu-nav justify-content-center d-flex flex-lg-column">

            {/* Dark Mode Toggle */}
            <li className="nav-item" onClick={toggleDarkMode}>
              <NavLink id="light-dark" className="mb-2">
                <i className={`ri-sun-line theme-mode-icon ${isDarkMode ? 'dark' : 'light'}`}></i>
              </NavLink>
              <UncontrolledTooltip target="light-dark" placement="right">
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </UncontrolledTooltip>
            </li>

            {/* Dropdown for profile picture (visible on larger screens) */}
            <Dropdown nav isOpen={isOpen} toggle={toggleDropdown} className="nav-item btn-group dropup profile-user-dropdown">
              <DropdownToggle className="nav-link mb-2" tag="a" onClick={toggleDropdown}>
                <img src={Logo} alt="Profile" className="profile-user rounded-circle" />
              </DropdownToggle>
              {/* <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Profile <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                <DropdownItem>Setting <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  className="dropdown-item"
                >
                  Log out <i className="ri-logout-circle-r-line float-end text-muted"></i>
                </DropdownItem>


              </DropdownMenu> */}
            </Dropdown>
          </Nav>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Sidebar;