import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_KEY = 'feedback-form-state';

form.addEventListener('input',throttle(onFormData,500));
form.addEventListener('submit',onSubmitForm);

const formData = {}

function onFormData(e){
    formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onSubmitForm(e){
  console.log(JSON.parse(localStorage.getItem(LOCAL_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}

(function dataFormLS(){
  const data = JSON.parse(localStorage.getItem(LOCAL_KEY));
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
})();