const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const lowercaseInput = document.getElementById('lowercase');
const numbersInput = document.getElementById('numbers');
const symbolsInput = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthText = document.getElementById("strength")

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword() {
  let length = Number(lengthInput.value);
  let chars = "";

  if (!length || length < 1) {
    passwordInput.value = "Enter a valid length";
    strengthText.textContent = 'None';
    return;
  }
  
  if (uppercaseInput.checked) chars += uppercaseChars;
  if (lowercaseInput.checked) chars += lowercaseChars;
  if (numbersInput.checked) chars += numberChars;
  if (symbolsInput.checked) chars += symbolChars;

  if (chars === "") {
    passwordInput.value = "Select at least one option";
    strengthText.textContent = 'None';
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordInput.value = password;
  checkStrength(password);
}

function checkStrength(password) {
  let strength = 0

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "red";
  } else if (strength <= 4) {
    strengthText.textContent = "Medium";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "Strong";
    strengthText.style.color = "limegreen";
  }
}

copyBtn.addEventListener('click', function() {
  navigator.clipboard.writeText(passwordInput.value);
});

generateBtn.addEventListener("click", generatePassword)

