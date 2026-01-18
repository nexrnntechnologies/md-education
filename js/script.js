document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------
       1. Mobile Navigation Toggle
    ---------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });

    /* ----------------------------------
       2. Active Link Highlight on Scroll
    ---------------------------------- */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -100 to trigger highlight slightly before the section hits top
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    /* ----------------------------------
       3. Contact Form Validation
    ---------------------------------- */
    const form = document.getElementById('admissionForm');
    const successMsg = document.getElementById('formSuccess');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Reset errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        successMsg.textContent = '';

        let isValid = true;

        // Get Values
        const fullName = document.getElementById('fullName').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate Name
        if (fullName === '') {
            document.getElementById('nameError').textContent = 'Full Name is required.';
            isValid = false;
        }

        // Validate Mobile (Simple 10 digit check)
        const phoneRegex = /^[0-9]{10}$/;
        if (mobile === '') {
            document.getElementById('mobileError').textContent = 'Mobile number is required.';
            isValid = false;
        } else if (!phoneRegex.test(mobile)) {
            document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit number.';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Message
        if (message === '') {
            document.getElementById('msgError').textContent = 'Please enter your message.';
            isValid = false;
        }

        // If Valid
        if (isValid) {
            // Simulate API call
            const submitBtn = form.querySelector('button');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                successMsg.textContent = `Thank you, ${fullName}! We have received your inquiry and will contact you shortly.`;
                form.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    successMsg.textContent = '';
                }, 5000);
            }, 1500);
        }
    });
});
