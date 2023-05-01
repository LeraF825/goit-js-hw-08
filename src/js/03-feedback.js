import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

const LOCAL_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

let formData = {
  email: '',
  message: '',
};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));

  if (e.target.name === 'email' && message.value !== '') {
    return;
  }
  if (e.target.name === 'message' && email.value !== '') {
    return;
  }

  email.value = formData.email;
  message.value = formData.message;
}

function onSubmitForm(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);

  email.value = '';
  message.value = '';
  formData = {
    email: '',
    message: ''
  };
}

const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY));
if (savedData) {
  formData = {
    ...formData,
    ...savedData,
  };
}
email.value = formData.email || '';
message.value = formData.message || '';
