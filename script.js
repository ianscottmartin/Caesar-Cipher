let storedShift = 0; // Variable to store the shift value used for encryption
let encryptedWithRandomShift = false; // Flag to indicate if the name was encrypted with a random shift

// Function to generate a random shift value between 1 and 25
function generateRandomShift() {
  return Math.floor(Math.random() * 25) + 1;
}

// Function to handle form submission for encryption
document
  .getElementById("encryptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const originalName = document.getElementById("originalName").value;
    let shiftValue = document.getElementById("randomShift").checked
      ? generateRandomShift()
      : parseInt(document.getElementById("shiftValue").value);
    const encryptedName = encryptFriendName(originalName, shiftValue);
    const encryptedNameElement = document.getElementById("encryptedName");
    encryptedNameElement.textContent = "Encrypted name: " + encryptedName;
    encryptedNameElement.classList.add("pop-out");
    document.getElementById("encryptedNameInput").value = encryptedName; // Set encrypted name into decrypted input
    storedShift = shiftValue; // Store the shift value
    encryptedWithRandomShift = document.getElementById("randomShift").checked; // Update flag
    document.getElementById("decryptionShiftValue").value = shiftValue; // Auto-fill decryption shift value
  });

// Function to handle form submission for decryption
document
  .getElementById("decryptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const encryptedName = document.getElementById("encryptedNameInput").value;
    const shiftValue = parseInt(
      document.getElementById("decryptionShiftValue").value
    ); // Use user-defined shift value
    const decryptedName = decryptFriendName(encryptedName, shiftValue);
    const decryptedNameElement = document.createElement("p"); // Create a new paragraph element
    decryptedNameElement.textContent = "Decrypted name: " + decryptedName;
    decryptedNameElement.classList.add("pop-out");
    document.getElementById("decryptionResult").innerHTML = ""; // Clear previous result
    document
      .getElementById("decryptionResult")
      .appendChild(decryptedNameElement); // Append the new paragraph element
  });

// Function to handle click event on reset button
document
  .getElementById("resetButton")
  .addEventListener("click", function (event) {
    // Reset input fields and clear displayed messages
    document.getElementById("originalName").value = "";
    document.getElementById("encryptedName").textContent = "";
    document.getElementById("encryptedNameInput").value = "";
    document.getElementById("decryptionResult").textContent = "";
    document.getElementById("shiftValue").value = ""; // Reset shift value
    document.getElementById("decryptionShiftValue").value = ""; // Reset decryption shift value
    storedShift = 0; // Reset stored shift value
    encryptedWithRandomShift = false; // Reset flag
  });

// Function to perform Caesar Cipher encryption on a friend's name with a specified shift value
function encryptFriendName(name, shift) {
  let encryptedName = "";
  for (let i = 0; i < name.length; i++) {
    encryptedName += caesarCipher(name[i], shift, true); // Encrypt each character
  }
  storedShift = shift; // Store the shift value
  return encryptedName;
}

// Function to perform Caesar Cipher decryption on an encrypted name with the stored shift value
function decryptFriendName(encryptedName, shift) {
  let decryptedName = "";
  for (let i = 0; i < encryptedName.length; i++) {
    decryptedName += caesarCipher(encryptedName[i], shift, false); // Decrypt each character
  }
  return decryptedName;
}

// Function to perform Caesar Cipher encryption or decryption on a single character
function caesarCipher(char, shift, encrypt) {
  const charCode = char.charCodeAt(0);
  const baseCharCode = char >= "a" ? 97 : 65; // Determine base char code for uppercase or lowercase letters
  shift = shift % 26; // Normalize shift value to be within the range of 0-25
  if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
    // Check if the character is a letter
    // Apply encryption or decryption based on the flag
    const shiftedCharCode = encrypt
      ? (charCode - baseCharCode + shift) % 26
      : (charCode - baseCharCode - shift + 26) % 26;
    return String.fromCharCode(shiftedCharCode + baseCharCode);
  } else {
    // Non-alphabetic characters remain unchanged
    return char;
  }
}

// Function to enable/disable shift value input based on random shift checkbox
document.getElementById("randomShift").addEventListener("change", function () {
  const shiftValueInput = document.getElementById("shiftValue");
  shiftValueInput.disabled = this.checked;
  if (this.checked) {
    shiftValueInput.value = ""; // Clear shift value input when random shift is enabled
  }
});
