const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    const answer = question.nextElementSibling;

    question.addEventListener('click', () => {
      const isOpen = question.classList.contains('active');

      // Close all other FAQs
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.style.height = '0';
      });

      // Toggle current one
      if (!isOpen) {
        question.classList.add('active');
        answer.style.height = answer.scrollHeight + 'px';
      }
    });

    // Optional: Reset height on resize if open
    window.addEventListener('resize', () => {
      if (question.classList.contains('active')) {
        answer.style.height = answer.scrollHeight + 'px';
      }
    });
  });
