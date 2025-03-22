// script.js

// Select DOM elements
const inputArea = document.getElementById('inputArea');
const outputArea = document.getElementById('outputArea');
const copyButton = document.getElementById('copyButton');
const downloadButton = document.getElementById('downloadButton');
const darkModeToggle = document.getElementById('darkModeToggle');

// Initialize Turndown Service
const turndownService = new TurndownService();

// Function to convert input to Markdown
function convertToMarkdown() {
    const inputContent = inputArea.value;
    const markdownContent = turndownService.turndown(inputContent);
    outputArea.value = markdownContent;
}

// Event listener for input changes
inputArea.addEventListener('input', convertToMarkdown);

// Copy Markdown to Clipboard
copyButton.addEventListener('click', () => {
    outputArea.select();
    document.execCommand('copy');
    alert('Markdown copied to clipboard!');
});

// Download Markdown as a .md file
downloadButton.addEventListener('click', () => {
    const markdownContent = outputArea.value;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.md';
    a.click();
    URL.revokeObjectURL(url);
});

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
