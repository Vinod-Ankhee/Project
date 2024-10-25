// Initialize variables and constants
const predefinedColors = [
  '#FF6B6B', // Coral Red
  '#4ECDC4', // Turquoise
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage Green
  '#FFEEAD', // Cream
  '#D4A5A5', // Dusty Rose
  '#9B786F', // Mocha
  '#A8E6CE'  // Mint
];
let currentColorIndex = 0;

// Get DOM elements
const changeColorBtn = document.getElementById('changeColorBtn');
const randomColorBtn = document.getElementById('randomColorBtn');
const colorDisplay = document.getElementById('colorDisplay');
const body = document.body;

// Function to update the color display
function updateColorDisplay(color) {
  colorDisplay.textContent = `Current color: ${color}`;
  body.style.backgroundColor = color;
}

// Function to cycle through predefined colors
function cycleColors() {
  const newColor = predefinedColors[currentColorIndex];
  updateColorDisplay(newColor);
  currentColorIndex = (currentColorIndex + 1) % predefinedColors.length;
}

// Function to generate random color
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Event listeners
changeColorBtn.addEventListener('click', cycleColors);
randomColorBtn.addEventListener('click', () => {
  const randomColor = generateRandomColor();
  updateColorDisplay(randomColor);
});

// Initialize with first color
cycleColors();