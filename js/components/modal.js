import { FORMSPREE_ENDPOINT, validateEmail, validateName } from '../utils/helpers.js';
import { COUPONS } from '../utils/constants.js';

export const initModals = () => {
    const toastContainer = document.getElementById('toast-container');

    const showToast = (message, type = 'error', title = '') => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'exclamation-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-triangle';

        toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <div class="toast-message">${message}</div>
        </div>
        <button class="close-toast" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        const autoRemove = setTimeout(() => {
            removeToast(toast);
        }, 5000);

        const closeBtn = toast.querySelector('.close-toast');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(autoRemove);
                removeToast(toast);
            });
        }

        const removeToast = (toastElement) => {
            toastElement.classList.remove('show');
            setTimeout(() => {
                if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
            }, 300);
        };
    };

    const enrollModal = document.getElementById('enrollModal');
    const successModal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-success-modal');
    const enrollButtons = document.querySelectorAll('.enroll-btn');

    enrollButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (enrollModal) {
                enrollModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (enrollModal) enrollModal.style.display = 'none';
            if (successModal) successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === enrollModal) {
            enrollModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const enrollmentForm = document.getElementById('enrollmentForm');
    if (!enrollmentForm) return;

    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('fullName')?.value || '';
        const emailVal = document.getElementById('email')?.value || '';
        const paymentMethodVal = document.getElementById('paymentMethod')?.value || '';

        if (!nameVal || !emailVal || !paymentMethodVal) {
            showToast('Please fill in all required fields (Name, Email, and Payment Method).', 'error', 'Missing Information');

            if (!nameVal) document.getElementById('fullName').style.borderColor = 'var(--secondary)';
            if (!emailVal) document.getElementById('email').style.borderColor = 'var(--secondary)';
            if (!paymentMethodVal) document.getElementById('paymentMethod').style.borderColor = 'var(--secondary)';

            return;
        }

        if (!validateName(nameVal)) {
            showToast('Please enter your full name (minimum 2 characters)', 'error', 'Name Required');
            document.getElementById('fullName').focus();
            return;
        }

        if (!validateEmail(emailVal)) {
            showToast('Please enter a valid email address (example: name@domain.com)', 'error', 'Invalid Email');
            document.getElementById('email').focus();
            return;
        }

        document.querySelectorAll('.form-group input, .form-group select').forEach((field) => {
            field.style.borderColor = 'var(--gray-light)';
        });

        const data = new FormData(enrollmentForm);

        const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
        }

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: data,
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then(() => {
                if (enrollModal) enrollModal.style.display = 'none';
                if (successModal) successModal.style.display = 'block';
                enrollmentForm.reset();

                const totalPrice = document.querySelector('.total-price');
                if (totalPrice) {
                    totalPrice.textContent = '$197.00';
                    totalPrice.style.color = 'var(--primary)';
                }
                const discountMsg = document.querySelector('.discount-message');
                if (discountMsg) discountMsg.remove();

                showToast('Your enrollment was successful! Check your email for course access.', 'success', 'Enrollment Complete!');
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                showToast('There was an error submitting the form. Please check your connection and try again.', 'error', 'Submission Failed');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
    });

    const couponInput = document.getElementById('coupon');
    if (couponInput) {
        couponInput.addEventListener('change', (e) => {
            const coupon = e.target.value.trim().toUpperCase();
            const totalPrice = document.querySelector('.total-price');
            const originalPrice = 197;

            if (coupon && COUPONS[coupon]) {
                const discount = COUPONS[coupon];
                const discountedPrice = originalPrice * (1 - discount);

                if (totalPrice) {
                    totalPrice.textContent = `$${discountedPrice.toFixed(2)}`;
                    totalPrice.style.color = 'var(--accent)';

                    if (!document.querySelector('.discount-message')) {
                        const discountMsg = document.createElement('div');
                        discountMsg.className = 'discount-message';
                        discountMsg.style.color = 'var(--accent)';
                        discountMsg.style.fontSize = '0.9rem';
                        discountMsg.style.marginTop = '0.5rem';
                        discountMsg.textContent = `Discount applied: ${(discount * 100)}% off!`;
                        totalPrice.parentElement.appendChild(discountMsg);
                    }
                }

                showToast(`Coupon applied! You saved $${(originalPrice - discountedPrice).toFixed(2)}.`, 'success', 'Discount Applied');
            } else if (coupon) {
                showToast('The coupon code you entered is invalid or has expired.', 'error', 'Invalid Coupon');
                couponInput.value = '';
                if (totalPrice) {
                    totalPrice.textContent = '$197.00';
                    totalPrice.style.color = 'var(--primary)';
                }

                const discountMsg = document.querySelector('.discount-message');
                if (discountMsg) discountMsg.remove();
            }
        });
    }
};
