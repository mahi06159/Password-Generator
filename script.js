document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');

    // Update length display when slider changes
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', function() {
        if (!passwordInput.value) return;
        
        passwordInput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Generate password
    generateBtn.addEventListener('click', function() {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        
        // Validate at least one character type is selected
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert('Please select at least one character type!');
            return;
        }
        
        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        passwordInput.value = password;
        
        // Update strength meter
        updateStrengthMeter(password);
    });

    // Password generation function
    function generatePassword(length, upper, lower, number, symbol) {
        let chars = '';
        let password = '';
        
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (upper) chars += uppercaseChars;
        if (lower) chars += lowercaseChars;
        if (number) chars += numberChars;
        if (symbol) chars += symbolChars;
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        return password;
    }

    // Password strength evaluation
    function updateStrengthMeter(password) {
        // Simple strength calculation based on length and character variety
        let strength = 0;
        
        // Length contributes up to 50 points (max at 20+ chars)
        strength += Math.min(password.length * 2.5, 50);
        
        // Each character type adds points
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[a-z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Cap at 100
        strength = Math.min(strength, 100);
        
        // Update UI
        strengthBar.style.width = strength + '%';
        
        if (strength < 40) {
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthLabel.textContent = 'Strength: Weak';
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = '#f39c12';
            strengthLabel.textContent = 'Strength: Medium';
        } else {
            strengthBar.style.backgroundColor = '#2ecc71';
            strengthLabel.textContent = 'Strength: Strong';
        }
    }
    
    // Generate a password on page load
    generateBtn.click();
});
