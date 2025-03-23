// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const pasteArea = document.getElementById('pasteArea');
    const outputArea = document.getElementById('outputArea');
    const copyButton = document.getElementById('copyButton');
    const resetButton = document.getElementById('resetButton');
    const downloadButton = document.getElementById('downloadButton');
    const darkModeToggle = document.getElementById('darkModeToggle');

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
    copyButton.addEventListener('click', function() {
        outputArea.select();
        document.execCommand('copy');
    });

    // Reset both input and output areas - FIXED VERSION
    resetButton.addEventListener('click', function() {
        // Clear content directly using DOM methods
        while (pasteArea.firstChild) {
            pasteArea.removeChild(pasteArea.firstChild);
        }
        outputArea.value = '';
        
        // Force a UI refresh
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        pasteArea.dispatchEvent(event);
    });

    // Download Markdown as a .md file
    downloadButton.addEventListener('click', function() {
        const markdownContent = outputArea.value;
        if (!markdownContent.trim()) {
            alert('No content to download!');
            return;
        }
        
        // Create a blob and download it
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.md';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Toggle Dark Mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Initialize the output area
    convertToMarkdown();
});
