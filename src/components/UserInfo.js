export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._nameElement = document.querySelector(profileName);
    this._jobElement = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._nameElement.textContent = job;
  }
}
