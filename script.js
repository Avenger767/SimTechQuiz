
document.addEventListener('DOMContentLoaded', function () {
  const motionForm = document.getElementById('motion-quiz');
  const mpicForm = document.getElementById('mpic-quiz');

  if (motionForm) {
    motionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      finishQuiz();
    });
  }

  if (mpicForm) {
    mpicForm.addEventListener('submit', function (e) {
      e.preventDefault();
      exportResults('Interface Quiz', mpicForm);
      setTimeout(() => {
        window.location.href = 'motion.html';
      }, 1000);
    });
  }

  function exportResults(quizTitle, form) {
    const username = localStorage.getItem('quizUser') || 'Anonymous';
    let csvContent = `Quiz Title,${quizTitle}\nUser,${username}\n\n`;
    const formData = new FormData(form);
    const questions = new Set();

    for (const [name, value] of formData.entries()) {
      if (!questions.has(name)) {
        questions.add(name);
        csvContent += `${name},${value}\n`;
      }
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${quizTitle.replace(/\s+/g, '_')}_results.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function calculateScore(form) {
    const correctAnswers = {
      'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
      'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
      'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
    };
    let score = 0;
    let total = 0;
    const formData = new FormData(form);
    for (const [name, value] of formData.entries()) {
      if (name in correctAnswers) {
        total++;
        if (value === correctAnswers[name]) {
          score++;
        }
      }
    }
    return { score, total };
  }

  function showFeedback(form, correctAnswers) {
    for (const [key, correct] of Object.entries(correctAnswers)) {
      const options = form.querySelectorAll(`[name='${key}']`);
      options.forEach(opt => {
        const label = opt.parentElement;
        if (opt.value === correct) {
          label.style.color = 'green';
          label.style.fontWeight = 'bold';
        } else if (opt.checked && opt.value !== correct) {
          label.style.color = 'red';
          label.style.fontWeight = 'bold';
        }
      });
    }
  }

  window.finishQuiz = function() {
    const form = document.getElementById("motion-quiz");
    const correctAnswers = {
      'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
      'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
      'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
    };
    const result = calculateScore(form);
    localStorage.setItem('lastScore', result.score);
    localStorage.setItem('lastTotal', result.total);
    showFeedback(form, correctAnswers);
    exportResults("Motion Quiz", form);
    setTimeout(() => {
      window.location.href = 'results.html';
    }, 3000);
  };
});

function finishInterfaceQuiz() {
  const form = document.getElementById("mpic-quiz");
  const correctAnswers = {
    'q1': '0', 'q2': '0', 'q3': '1', 'q4': '1', 'q5': '0',
    'q6': '0', 'q7': '2', 'q8': '0', 'q9': '1', 'q10': '2',
    'q11': '3', 'q12': ['0','1','2','3','4']
  };

  let score = 0;
  let total = 0;
  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    if (name in correctAnswers) {
      total++;
      const correct = correctAnswers[name];
      if (Array.isArray(correct)) {
        if (formData.getAll(name).sort().toString() === correct.sort().toString()) {
          score++;
        }
      } else if (value === correct) {
        score++;
      }
    }
  }

  localStorage.setItem('lastScore', score);
  localStorage.setItem('lastTotal', total);
  showFeedback(form, correctAnswers);
  exportResults("Interface Quiz", form);
  setTimeout(() => {
    window.location.href = 'motion.html';
  }, 3000);
}

function finishQuiz() {
  const form = document.getElementById("motion-quiz");
  const correctAnswers = {
    'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
    'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
    'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
  };
  const result = calculateScore(form);
  localStorage.setItem('motionScore', result.score);
  localStorage.setItem('motionTotal', result.total);
  showFeedback(form, correctAnswers);
  exportResults("Motion Quiz", form);
  setTimeout(() => {
    window.location.href = 'summary.html';
  }, 3000);
}

function finishInterfaceQuiz() {
  const form = document.getElementById("mpic-quiz");
  const correctAnswers = {
    'q1': '0', 'q2': '0', 'q3': '1', 'q4': '1', 'q5': '0',
    'q6': '0', 'q7': '2', 'q8': '0', 'q9': '1', 'q10': '2',
    'q11': '3', 'q12': ['0','1','2','3','4']
  };

  let score = 0;
  let total = 0;
  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    if (name in correctAnswers) {
      total++;
      const correct = correctAnswers[name];
      if (Array.isArray(correct)) {
        if (formData.getAll(name).sort().toString() === correct.sort().toString()) {
          score++;
        }
      } else if (value === correct) {
        score++;
      }
    }
  }

  localStorage.setItem('interfaceScore', score);
  localStorage.setItem('interfaceTotal', total);
  showFeedback(form, correctAnswers);
  exportResults("Interface Quiz", form);
  setTimeout(() => {
    window.location.href = 'motion.html';
  }, 3000);
}
