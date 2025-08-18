export default class UserInfo {
  constructor({ profileName, profileJob, profileAvatar }) {
    this._nameElement = document.querySelector(profileName);
    this._jobElement = document.querySelector(profileJob);
    this._avatarElement = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
  }
}
