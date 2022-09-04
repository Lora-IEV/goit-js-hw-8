import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form  textarea'),
    input: document.querySelector('.feedback-form input')
};


let formContent = {};


operationsWithTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));


function onInput(e) {
     e.preventDefault();
    formContent[e.target.name] = e.target.value;
    
localStorage.setItem(STORAGE_KEY, JSON.stringify(formContent));
    
}


function operationsWithTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const parseMessage = JSON.parse(savedMessage);

    if (savedMessage) {
        (refs.textarea.value = parseMessage.message || "");
        (refs.input.value = parseMessage.email || "");
     localStorage.setItem(STORAGE_KEY, JSON.stringify(formContent));
        
    }
}


function onFormSubmit(e) {
   e.preventDefault();
    console.log('Отправил форму');
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}