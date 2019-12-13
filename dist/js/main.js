const form = document.querySelector('.url-form');
const urlInput = document.querySelector('#input-url');
const errorMsg = document.querySelector('#error-msg');

function handleUrlInput(e) {
    errorMsg.classList.remove('invalid');
}
// form[0].addEventListener('input', function(e) {
//     console.log('THIS IS INPUT');
//     if(e.target.validity.valid || e.target.value === "") {
//         e.target.nextElementSibling.textContent = '';
//         e.target.classList.remove('invalid');
//     } else {
//         e.target.classList.add('invalid');
//         e.target.nextElementSibling.textContent = e.target.nextElementSibling.dataset.error;
//     }
// })

function handleShortUrl(e) {
    e.preventDefault();
    if(urlInput.value === "") {
        errorMsg.textContent = errorMsg.dataset.error;
    }
}

// Event Listener
urlInput.addEventListener('input', handleUrlInput);
form.addEventListener('submit', handleShortUrl)