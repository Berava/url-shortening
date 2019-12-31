 // selecting page elements
const form = document.querySelector('.url-form');
const urlInput = document.querySelector('#input-url');
const errorMsg = document.querySelector('#error-msg');
// const copyBtn = document.querySelectorAll('.copy');
const responseField = document.querySelector('.response-field');

// information to reach API
const endPoint = 'https://rel.ink/api/links/';
// domain name 
const domainName = 'https://rel.ink/';

// function to verify if the user has entered a valid url
function isValidURL(url) {
    if(String(url) !== url) return false
    const regex = /(https?:\/\/)?(www\.)?\w{2,}(\.\w{2,}){1,}/g,
    didMatch = url.match(regex)
    return Array.isArray(didMatch)
}

// function to show message error
function showError(msg) {
    switch (msg) {
        case 'empty': 
            errorMsg.innerHTML = errorMsg.dataset.empty;
            break;
        case 'invalid':
            errorMsg.innerHTML = errorMsg.dataset.invalid;
            break;
        default:
            console.log('May be a problem here');
    }
    // errorMsg.innerHTML = errorMsg.dataset.error;
    errorMsg.classList.add('error-msg');
    urlInput.classList.add('invalid');
}

// Hide the error
function hideError() {
    errorMsg.innerHTML = '';
    errorMsg.classList.remove('error-msg');
    urlInput.classList.remove('invalid');
}

// Create a div with the response from the API
function createDivResponse(infos) {
    const newDiv = document.createElement('div');
    const newBtn = document.createElement('button');
    newDiv.classList.add('response');
    newBtn.classList.add('copy');
    newBtn.innerText = "Copy";
    newDiv.innerHTML = `<p>${urlInput.value}</p>
        <hr class="line" />
        <p class="shortlink">${domainName}${infos.hashid}</p>`;
    newBtn.addEventListener('click', handleCopy);
    newDiv.appendChild(newBtn);
    return newDiv;
}


// AJAX Function
const shortenUrl = async () => {
    const urlToShorten = urlInput.value;
    if (isValidURL(urlToShorten)) {
        const data = JSON.stringify({url: urlToShorten});
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json"
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                // console.log(jsonResponse);
                responseField.appendChild(createDivResponse(jsonResponse));
                urlInput.value = '';
            }
        } catch(error) {
            console.log(error);
        }
    } else {
        showError('invalid');
    }
}

const displayShortUrl = (event) => {
    event.preventDefault();
    if (urlInput.value !== '') {
        hideError();
        shortenUrl();
        // copyBtn.forEach(btn => btn.addEventListener('click', handleCopy));
    } else {
        showError('empty');
    }
}

function handleCopy (event) {
    window.getSelection().removeAllRanges();
    // select the short link
    const shortLink = event.target.previousElementSibling;
    const range = document.createRange();
    range.selectNode(shortLink);
    window.getSelection().addRange(range);
    try {
        // Now that we've selected the short text, execute the copy command
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy url command was ' + msg);
        event.target.innerHTML = 'Copied!';
        event.target.disabled = true;
    } catch(err) {
        console.log('Oops, unable to copy');
    }
    // Remove the selections - NOTE : Should use
    // removeRange(range) when it is supported
    window.getSelection().removeAllRanges();
}

// Event Listener
form.addEventListener('submit', displayShortUrl)
                
form[0].addEventListener('input', function(e) {
    console.log('THIS IS INPUT');
    // if(e.target.value === "") {
    //     e.target.nextElementSibling.textContent = '';
    //     e.target.classList.remove('invalid');
    // }
    e.target.classList.remove('invalid');
    e.target.nextElementSibling.textContent = '';
    e.target.nextElementSibling.classList.remove('error-msg');

});
