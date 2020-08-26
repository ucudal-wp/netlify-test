const greetingServiceUrl = '/.netlify/functions/greet';

const greetingText = document.querySelector('#greeting');

const nameInput = document.querySelector('#name');

const okButton = document.querySelector('#ok');
okButton.addEventListener('click', () => {
  const name = nameInput.value;
  fetch(`${greetingServiceUrl}?name=${name}`)
    .then((res) => res.json())
    .then((data) => {
      const { greeting } = data;
      greetingText.textContent = greeting;
    });
});
