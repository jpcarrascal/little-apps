// Word limits for each field
const wordLimits = {
    0: null,
    1: 500,
    2: 500,
    3: 350,
    4: 250,
    5: null
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    attachEventListeners();
});

// Load all data from localStorage
function loadFromLocalStorage() {
    // Load text fields
    for (let i = 0; i < 6; i++) {
        const textarea = document.getElementById(`field_${i}`);
        const saved = localStorage.getItem(`question_${i}`);
        if (saved) {
            textarea.value = saved;
        }
        // Load saved height
        const savedHeight = localStorage.getItem(`height_${i}`);
        if (savedHeight) {
            textarea.style.height = savedHeight;
        }
        updateWordCount(i);
    }

    // Load checkboxes
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const field = checkbox.dataset.field;
        const item = checkbox.dataset.item;
        const key = `checkbox_${field}_${item}`;
        const saved = localStorage.getItem(key);
        if (saved === 'true') {
            checkbox.checked = true;
        }
    });
}

// Attach event listeners
function attachEventListeners() {
    // Textarea listeners for auto-save and word count
    for (let i = 0; i < 6; i++) {
        const textarea = document.getElementById(`field_${i}`);
        textarea.addEventListener('input', () => {
            localStorage.setItem(`question_${i}`, textarea.value);
            localStorage.setItem(`height_${i}`, textarea.style.height);
            updateWordCount(i);
        });
        // Also save height on other events that might change it
        textarea.addEventListener('mouseup', () => {
            localStorage.setItem(`height_${i}`, textarea.style.height);
        });
    }

    // Checkbox listeners for auto-save
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const field = checkbox.dataset.field;
            const item = checkbox.dataset.item;
            const key = `checkbox_${field}_${item}`;
            localStorage.setItem(key, checkbox.checked);
        });
    });

    // Copy button listeners
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const field = button.dataset.field;
            copyToClipboard(field, button);
        });
    });

    // Copy all button listener
    const copyAllBtn = document.querySelector('.copy-all-btn');
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', () => {
            copyAllResponses(copyAllBtn);
        });
    }
}

// Update word count for a specific field
function updateWordCount(fieldIndex) {
    const textarea = document.getElementById(`field_${fieldIndex}`);
    const text = textarea.value.trim();
    const wordCount = text === '' ? 0 : text.split(/\s+/).length;

    // Find the word count display for this field
    const section = textarea.closest('.form-section');
    const wordCountElement = section.querySelector('.word-count .current-count');
    const warningElement = section.querySelector('.word-warning');

    wordCountElement.textContent = wordCount;

    // Check if limit is exceeded
    const limit = wordLimits[fieldIndex];
    if (limit && wordCount > limit) {
        if (warningElement) {
            warningElement.style.display = 'inline';
        }
    } else {
        if (warningElement) {
            warningElement.style.display = 'none';
        }
    }
}

// Copy text to clipboard
function copyToClipboard(fieldIndex, button) {
    const textarea = document.getElementById(`field_${fieldIndex}`);
    const text = textarea.value;

    // Use modern clipboard API
    navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        console.error('Failed to copy:', err);
        alert('Failed to copy text');
    });
}

// Copy all responses to clipboard
function copyAllResponses(button) {
    const allText = [];
    for (let i = 0; i < 6; i++) {
        const textarea = document.getElementById(`field_${i}`);
        allText.push(textarea.value);
    }
    
    const combined = allText.join('\n\n---\n\n');

    navigator.clipboard.writeText(combined).then(() => {
        // Show feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        console.error('Failed to copy:', err);
        alert('Failed to copy text');
    });
}
