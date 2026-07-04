const passwordInput = document.getElementById("password") as HTMLInputElement;
const lengthInput = document.getElementById('length') as HTMLInputElement;
const uppercaseInput = document.getElementById('uppercase') as HTMLInputElement;
const lowercaseInput = document.getElementById('lowercase') as HTMLInputElement;
const numbersInput = document.getElementById('numbers') as HTMLInputElement;
const symbolsInput = document.getElementById('symbols') as HTMLInputElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const strengthText = document.getElementById("strength") as HTMLSpanElement;
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;

const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
const numberChars: string = '0123456789';
const symbolChars: string = '!@#$%^&*()_+-=[]{}|;:,.<>?';


function generatePassword(): void {
  let length: number = Number(lengthInput.value);
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

function checkStrength(password: string): void {
  let strength = 0;

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


if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.textContent = 'Dark Mode';
}

themeToggle.addEventListener('click', function(): void {
  document.body.classList.toggle("light-mode");

  const isLight: boolean = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
