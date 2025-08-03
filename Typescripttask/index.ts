const User = {
  name: 'Alice',
  welcome: function (): void {
    console.log(`Welcome, ${this.name}!`);
    alert(`Welcome, ${this.name}!`); // Show in alert as well
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector<HTMLButtonElement>('#loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', User.welcome.bind(User));
  }
});
