import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import Profile from '../Home/Profile.js';

class Settings extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      graphics: userProfile.graphics,
      sound: userProfile.sound
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  componentWillMount() {
    if(userProfile.User === 'Guest') {
      if(window.localStorage.id) {
        $.ajax({
          url: '/api/getUserByFacebookID/' + window.localStorage.id,
          method: 'Get',
          success: (data) => {
            userProfile.User = data.username;
            userProfile.Skins = data.skins || [];
            userProfile.facebookid = data.facebookid;
            userProfile.userId = data.id;
            userProfile.FacebookPicture = data.url;
            browserHistory.push('Settings')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }  
    }
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  clickGfx(btn) {
    this.setState({graphics: btn});
  }

  clickSound(btn) {
    this.setState({sound: btn});
  }

  accept() {
    userProfile.graphics = this.state.graphics;
    userProfile.sound = this.state.sound;
    browserHistory.push('/Home');
  }

  render() {
      return (
        <div className='menuContainer'>
          <div className='menuBackground'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Settings</h1>
            </div>

            <div className='SettingsButtons'>
              <h3>Graphics Quality</h3>
              <button className={'btn gfxBtn ' + (this.state.graphics === 0 ? 'btn-danger' : '')} onClick={() => this.clickGfx(0)}>Low</button>
              <button className={'btn gfxBtn ' + (this.state.graphics === 1 ? 'btn-warning' : '')} onClick={() => this.clickGfx(1)}>Medium</button>
              <button className={'btn gfxBtn ' + (this.state.graphics === 2 ? 'btn-success' : '')} onClick={() => this.clickGfx(2)}>High</button>
            </div>

            <div className='SettingsButtons'>
              <h3>Sound</h3>
              <button className={'btn gfxBtn ' + (this.state.sound === 0 ? 'btn-danger' : '')} onClick={() => this.clickSound(0)}>Off</button>
              <button className={'btn gfxBtn ' + (this.state.sound === 1 ? 'btn-success' : '')} onClick={() => this.clickSound(1)}>On</button>
            </div>

            <div id='StartMatch'>
              <button id='Start' className='btn btn-warning' onClick={() => this.accept()}>Accept Changes</button>
            </div>
          </div>
        </div>
      );
  }
}



export default Settings;