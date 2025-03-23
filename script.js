// script.js

// Select DOM elements
const pasteArea = document.getElementById('pasteArea');
const outputArea = document.getElementById('outputArea');
const copyButton = document.getElementById('copyButton');
const resetButton = document.getElementById('resetButton');
const downloadButton = document.getElementById('downloadButton');

// Initialize Turndown Service
const turndownService = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*'
});

// Function to convert HTML to Markdown
function convertToMarkdown() {
    const htmlContent = pasteArea.innerHTML;
    const markdownContent = turndownService.turndown(htmlContent);
    outputArea.value = markdownContent;
}

// Event listener for paste
pasteArea.addEventListener('paste', function(e) {
    // Cancel the default paste action
    e.preventDefault();
    
    // Get clipboard data as HTML
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text');
    
    // Insert the clipboard data into the contenteditable area
    document.execCommand('insertHTML', false, pastedData);
    
    // Convert the HTML to Markdown
    setTimeout(convertToMarkdown, 0);
});

// Also listen for input changes (for manually typed content)
pasteArea.addEventListener('input', convertToMarkdown);

// Copy Markdown to Clipboard
copyButton.addEventListener('click', () => {
    outputArea.select();
