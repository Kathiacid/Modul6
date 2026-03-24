export const vGlow = {
  mounted(el) {
    el.style.transition = 'all 0.3s ease';

    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = `
        0 0 10px rgba(255, 0, 100, 0.9),
        0 0 20px rgba(255, 0, 100, 0.7),
        0 0 40px rgba(255, 0, 100, 0.5)
      `;
      el.style.transform = 'translateY(-6px) scale(1.02)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = '';
      el.style.transform = '';
    });
  }
};
