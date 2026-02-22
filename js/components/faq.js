export const initFaq = () => {
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');

      document.querySelectorAll('.faq-answer').forEach((item) => {
        if (item !== answer && item.classList.contains('active')) {
          item.classList.remove('active');
          const prevToggle = item.previousElementSibling.querySelector('.faq-toggle');
          if (prevToggle) prevToggle.classList.remove('active');
        }
      });

      if (answer) answer.classList.toggle('active');
      if (toggle) toggle.classList.toggle('active');
    });
  });
};
