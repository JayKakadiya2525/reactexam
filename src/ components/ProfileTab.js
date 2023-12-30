import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { TabContent, TabPane } from 'reactstrap';
import '../assets/css/index.scss';
import '../assets/css/Profile.scss';
import Profile from './Tab/Profile';
import Setting from './Tab/Setting';
import Post from './Tab/Post';
import Home from './Tab/Home';
import Chat from './Tab/Chat';

function ProfileTab({ activeTab }) {
  const { isDarkMode } = useDarkMode();

  return (
    <React.Fragment key={isDarkMode}>
      <div className={`profiletab ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <TabContent activeTab={activeTab}>

          <TabPane tabId="home" id="pills-user">
            {activeTab === 'home' && <Home />}
          </TabPane>

          <TabPane tabId="chat" id="pills-user">
            {activeTab === 'chat' && <Chat />}
          </TabPane>

          <TabPane tabId="profile" id="pills-user">
            {activeTab === 'profile' && <Profile />}
          </TabPane>

          <TabPane tabId="home" id="pills-user">
            {activeTab === 'home' && <Home />}
          </TabPane>

          <TabPane tabId="setting" id="pills-setting">
            {activeTab === 'setting' && <Setting />}
          </TabPane>

          <TabPane tabId="post" id="pills-setting">
            {activeTab === 'post' && <Post />}
          </TabPane>

        </TabContent>
      </div>
    </React.Fragment>
  );
}

export default ProfileTab;
