/**
 * ЗАЯВКА НА ПРЕМИЮ «ФИЛАНТРОП» — JAVASCRIPT
 * Исправленная версия: свободная навигация + исправленный телефон
 */

(function() {
  'use strict';

  // ============================================
  // STATE
  // ============================================
  let currentStep = 1;
  const totalSteps = 6;
  const formData = {};

  // Subnominations data
  const subnominations = {
    performing: [
      { id: 'vocal', label: 'Вокал' },
      { id: 'choreo', label: 'Хореография' },
      { id: 'theater', label: 'Театральное искусство' },
      { id: 'circus', label: 'Цирковое искусство' },
      { id: 'instrumental', label: 'Инструментальное исполнение' },
    ],
    visual: [
      { id: 'painting', label: 'Живопись' },
      { id: 'graphics', label: 'Графика' },
      { id: 'sculpture', label: 'Скульптура' },
      { id: 'decorative', label: 'Декоративно-прикладное искусство' },
      { id: 'photo', label: 'Фотография' },
    ],
    literary: [
      { id: 'prose', label: 'Проза' },
      { id: 'poetry', label: 'Поэзия' },
      { id: 'drama', label: 'Драматургия' },
    ],
  };

  // Materials requirements
  const materialsRequirements = {
    performing: `
      <strong>Для исполнительского искусства:</strong>
      <ul>
        <li>Видеозапись выступления (до 10 минут, до 500 МБ)</li>
        <li>Фотографии с выступлений (2-5 шт, до 10 МБ каждая)</li>
        <li>Тексты исполняемых произведений (если есть)</li>
      </ul>
    `,
    visual: `
      <strong>Для изобразительного искусства:</strong>
      <ul>
        <li>Фотографии работ (3-10 шт, до 10 МБ каждая)</li>
        <li>Описание каждой работы (название, техника, размер, год)</li>
        <li>Фото работ в интерьере (по желанию)</li>
      </ul>
    `,
    literary: `
      <strong>Для литературного творчества:</strong>
      <ul>
        <li>Тексты произведений (DOC, DOCX, PDF до 20 МБ)</li>
        <li>Аудиозапись чтения (если есть, до 50 МБ)</li>
        <li>Публикации (если есть, PDF до 10 МБ)</li>
      </ul>
    `,
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const form = document.getElementById('applicationForm');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const errorSummary = document.getElementById('errorSummary');
  const errorList = document.getElementById('errorList');
  const progressFill = document.querySelector('.progress-fill');

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    // Set default date
    const dateInput = document.getElementById('applicationDate');
    if (dateInput) {
      dateInput.valueAsDate = new Date();
    }

    // Initialize file uploads
    initFileUploads();

    // Initialize character counter
    initCharCounter();

    // Initialize nomination change handler
    initNominationHandler();

    // Initialize input handlers
    initInputHandlers();

    // Initialize step navigation clicks
    initStepNavigation();

    // Update UI
    updateNavigation();
    updateProgress();
  }

  // ============================================
  // STEP NAVIGATION (CLICK ON STEPS)
  // ============================================
  function initStepNavigation() {
    document.querySelectorAll('.step').forEach(stepEl => {
      stepEl.addEventListener('click', () => {
        const step = parseInt(stepEl.dataset.step);
        if (step && step !== currentStep) {
          goToStep(step);
        }
      });
      stepEl.style.cursor = 'pointer';
    });
  }

  // ============================================
  // NAVIGATION
  // ============================================
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    // Теперь можно переходить дальше без валидации
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateAllSteps()) {
      submitForm();
    } else {
      showErrorSummary();
      scrollToFirstError();
    }
  });

  function goToStep(step) {
    // Hide current section
    document.getElementById(`section${currentStep}`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');

    // Show new section
    currentStep = step;
    document.getElementById(`section${currentStep}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

    // Mark completed steps (steps that were visited)
    for (let i = 1; i < currentStep; i++) {
      document.querySelector(`.step[data-step="${i}"]`).classList.add('completed');
    }

    updateNavigation();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavigation() {
    prevBtn.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }
  }

  function updateProgress() {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${percentage}%`;
  }

  // ============================================
  // VALIDATION (ONLY ON SUBMIT)
  // ============================================
  function validateAllSteps() {
    let isValid = true;
    const errors = [];
    
    for (let step = 1; step <= totalSteps; step++) {
      const section = document.getElementById(`section${step}`);
      const requiredInputs = section.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!validateField(input, errors)) {
          isValid = false;
        }
      });
    }

    // Check subnominations
    const subnominationsChecked = document.querySelectorAll('input[name="subnominations"]:checked');
    if (subnominationsChecked.length === 0) {
      isValid = false;
      errors.push('Выберите хотя бы одну подноминацию');
      document.getElementById('subnominationsError').textContent = 'Выберите хотя бы одну подноминацию';
    } else {
      document.getElementById('subnominationsError').textContent = '';
    }

    // Check biography length
    const bio = document.getElementById('biography');
    if (bio && bio.value.length < 500) {
      isValid = false;
      errors.push('Автобиография должна содержать не менее 500 символов (сейчас: ' + bio.value.length + ')');
    }

    if (!isValid) {
      showFullErrorSummary(errors);
    }

    return isValid;
  }

  function validateField(input, errors = []) {
    const value = input.type === 'checkbox' || input.type === 'radio' 
      ? input.checked 
      : input.value.trim();

    if (!value && input.required) {
      input.classList.add('error');
      showFieldError(input, 'Это поле обязательно для заполнения');
      errors.push(getFieldLabel(input) + ' не заполнено');
      return false;
    }

    if (input.type === 'email' && value && !isValidEmail(value)) {
      input.classList.add('error');
      showFieldError(input, 'Введите корректный email');
      errors.push('Некорректный email');
      return false;
    }

    input.classList.remove('error');
    clearFieldError(input);
    return true;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getFieldLabel(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : 'Поле';
  }

  function showFieldError(input, message) {
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearFieldError(input) {
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function showFullErrorSummary(errors) {
    if (errors.length > 0) {
      errorList.innerHTML = errors.map(e => `<li>${e}</li>`).join('');
      errorSummary.style.display = 'block';
      errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showErrorSummary() {
    errorSummary.style.display = 'block';
  }

  function scrollToFirstError() {
    const firstError = form.querySelector('.error, .error-message');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ============================================
  // FILE UPLOAD
  // ============================================
  function initFileUploads() {
    document.querySelectorAll('.file-upload').forEach(upload => {
      const uploadArea = upload.querySelector('.upload-area');
      const fileInput = upload.querySelector('.file-input');
      const fileList = upload.querySelector('.file-list');
      const accept = upload.dataset.accept || '';
      const maxSize = parseFloat(upload.dataset.max || '5');

      // Click to upload
      uploadArea.addEventListener('click', () => fileInput.click());

      // Drag and drop
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });

      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files, fileList, accept, maxSize);
      });

      // File input change
      fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files, fileList, accept, maxSize);
      });
    });
  }

  function handleFiles(files, fileList, accept, maxSizeMB) {
    Array.from(files).forEach(file => {
      // Validate file type
      if (accept) {
        const allowedTypes = accept.split(',').map(t => t.trim().replace('.', ''));
        const fileExt = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExt)) {
          alert(`Недопустимый формат файла: ${file.name}`);
          return;
        }
      }

      // Validate file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        alert(`Файл ${file.name} слишком большой (макс. ${maxSizeMB} МБ)`);
        return;
      }

      // Add to list
      addFileToList(file, fileList);

      // Preview for images
      if (file.type.startsWith('image/')) {
        const previewContainer = document.getElementById('photoPreview');
        if (previewContainer) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  function addFileToList(file, fileList) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
      <i class="fas fa-file"></i>
      <span class="file-item-name">${file.name} (${formatFileSize(file.size)})</span>
      <button type="button" class="file-item-remove" aria-label="Удалить файл">
        <i class="fas fa-times"></i>
      </button>
    `;

    fileItem.querySelector('.file-item-remove').addEventListener('click', () => {
      fileItem.remove();
    });

    fileList.appendChild(fileItem);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  }

  // ============================================
  // CHARACTER COUNTER
  // ============================================
  function initCharCounter() {
    const bioInput = document.getElementById('biography');
    const charCount = document.getElementById('charCount');
    const counter = document.querySelector('.char-counter');

    if (bioInput && charCount && counter) {
      bioInput.addEventListener('input', () => {
        const count = bioInput.value.length;
        charCount.textContent = count.toLocaleString('ru-RU');

        if (count >= 500) {
          counter.classList.add('valid');
          counter.classList.remove('invalid');
        } else {
          counter.classList.add('invalid');
          counter.classList.remove('valid');
        }
      });
    }
  }

  // ============================================
  // NOMINATION HANDLER
  // ============================================
  function initNominationHandler() {
    const nominationSelect = document.getElementById('nomination');
    const subnominationsContainer = document.getElementById('subnominationsContainer');
    const materialsFields = document.getElementById('materialsFields');
    const requirementsEl = document.getElementById('materialsRequirements');

    if (nominationSelect) {
      nominationSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        
        // Update subnominations
        if (subnominationsContainer && subnominations[value]) {
          subnominationsContainer.innerHTML = subnominations[value].map(sub => `
            <label class="checkbox-card">
              <input type="checkbox" name="subnominations" value="${sub.id}">
              <span>${sub.label}</span>
            </label>
          `).join('');

          // Add selection handler
          subnominationsContainer.querySelectorAll('.checkbox-card').forEach(card => {
            card.addEventListener('click', function() {
              this.classList.toggle('selected');
            });
          });
        }

        // Update materials requirements
        if (requirementsEl && materialsRequirements[value]) {
          requirementsEl.innerHTML = materialsRequirements[value];
        }

        // Update materials fields
        if (materialsFields && value) {
          materialsFields.innerHTML = generateMaterialsFields(value);
          initFileUploads(); // Re-initialize for new fields
        }
      });
    }
  }

  function generateMaterialsFields(nomination) {
    let fields = '';

    if (nomination === 'performing') {
      fields = `
        <div class="material-field">
          <label>Видеозапись выступления *</label>
          <span class="hint">До 10 минут, до 500 МБ (MP4, AVI, MOV)</span>
          <div class="file-upload" data-accept=".mp4,.avi,.mov" data-max="500">
            <div class="upload-area">
              <i class="fas fa-video upload-icon"></i>
              <p class="upload-text">Перетащите видео или нажмите для выбора</p>
              <p class="upload-hint">MP4, AVI, MOV до 500 МБ</p>
            </div>
            <input type="file" class="file-input" accept=".mp4,.avi,.mov" required>
            <div class="file-list"></div>
          </div>
        </div>
        <div class="material-field">
          <label>Фотографии с выступлений</label>
          <span class="hint">2-5 фотографий, до 10 МБ каждая</span>
          <div class="file-upload multiple" data-accept=".jpg,.jpeg,.png" data-max="10">
            <div class="upload-area">
              <i class="fas fa-images upload-icon"></i>
              <p class="upload-text">Перетащите фото или нажмите для выбора</p>
              <p class="upload-hint">JPG, PNG до 10 МБ</p>
            </div>
            <input type="file" class="file-input" accept=".jpg,.jpeg,.png" multiple>
            <div class="file-list"></div>
          </div>
        </div>
      `;
    } else if (nomination === 'visual') {
      fields = `
        <div class="material-field">
          <label>Фотографии работ *</label>
          <span class="hint">3-10 фотографий, до 10 МБ каждая</span>
          <div class="file-upload multiple" data-accept=".jpg,.jpeg,.png" data-max="10">
            <div class="upload-area">
              <i class="fas fa-images upload-icon"></i>
              <p class="upload-text">Перетащите фото работ или нажмите для выбора</p>
              <p class="upload-hint">JPG, PNG до 10 МБ</p>
            </div>
            <input type="file" class="file-input" accept=".jpg,.jpeg,.png" multiple required>
            <div class="file-list"></div>
          </div>
        </div>
        <div class="material-field">
          <label>Описание работ</label>
          <span class="hint">Название, техника, размер, год для каждой работы</span>
          <textarea name="worksDescription" rows="5" class="form-input" placeholder="1. Название работы, техника, размер, год&#10;2. ..."></textarea>
        </div>
      `;
    } else if (nomination === 'literary') {
      fields = `
        <div class="material-field">
          <label>Тексты произведений *</label>
          <span class="hint">DOC, DOCX, PDF до 20 МБ</span>
          <div class="file-upload multiple" data-accept=".pdf,.doc,.docx" data-max="20">
            <div class="upload-area">
              <i class="fas fa-file-alt upload-icon"></i>
              <p class="upload-text">Перетащите файлы или нажмите для выбора</p>
              <p class="upload-hint">PDF, DOC, DOCX до 20 МБ</p>
            </div>
            <input type="file" class="file-input" accept=".pdf,.doc,.docx" multiple required>
            <div class="file-list"></div>
          </div>
        </div>
        <div class="material-field">
          <label>Аудиозапись чтения (если есть)</label>
          <span class="hint">MP3, WAV до 50 МБ</span>
          <div class="file-upload" data-accept=".mp3,.wav" data-max="50">
            <div class="upload-area">
              <i class="fas fa-microphone upload-icon"></i>
              <p class="upload-text">Перетащите аудио или нажмите для выбора</p>
              <p class="upload-hint">MP3, WAV до 50 МБ</p>
            </div>
            <input type="file" class="file-input" accept=".mp3,.wav">
            <div class="file-list"></div>
          </div>
        </div>
      `;
    }

    return fields;
  }

  // ============================================
  // INPUT HANDLERS
  // ============================================
  function initInputHandlers() {
    // Clear error on input
    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        clearFieldError(input);
        errorSummary.style.display = 'none';
      });
    });

    // Phone mask - ИСПРАВЛЕННАЯ ВЕРСИЯ
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Remove leading 7 or 8
        if (value.startsWith('7')) {
          value = value.slice(1);
        } else if (value.startsWith('8')) {
          value = value.slice(1);
        }
        
        // Limit to 10 digits
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        
        // Format: +7 (XXX) XXX-XX-XX
        if (value.length > 0) {
          let formatted = '+7';
          if (value.length > 0) {
            formatted += ' (' + value.slice(0, 3);
          }
          if (value.length >= 3) {
            formatted += ') ' + value.slice(3, 6);
          }
          if (value.length >= 6) {
            formatted += '-' + value.slice(6, 8);
          }
          if (value.length >= 8) {
            formatted += '-' + value.slice(8, 10);
          }
          e.target.value = formatted;
        } else {
          e.target.value = '';
        }
      });

      // Allow backspace and delete
      input.addEventListener('keydown', (e) => {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1) {
          return;
        }
        // Allow: Ctrl+A, Command+A
        if ((e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))) {
          return;
        }
      });
    });
  }

  // ============================================
  // FORM SUBMISSION
  // ============================================
  function submitForm() {
    // Collect form data
    const formElements = form.elements;
    const data = {};

    for (let i = 0; i < formElements.length; i++) {
      const el = formElements[i];
      if (el.name && el.type !== 'submit' && el.type !== 'button') {
        if (el.type === 'checkbox') {
          if (el.checked) {
            if (!data[el.name]) data[el.name] = [];
            data[el.name].push(el.value);
          }
        } else if (el.type === 'radio') {
          if (el.checked) {
            data[el.name] = el.value;
          }
        } else {
          data[el.name] = el.value;
        }
      }
    }

    // Simulate submission
    console.log('Form data:', data);
    
    // Show success message
    alert(`
      ✅ Заявка успешно отправлена!
      
      Спасибо за участие в премии «Филантроп».
      
      Мы получили вашу заявку и свяжемся с вами 
      в ближайшее время по указанному email.
      
      Номер заявки: ${Date.now()}
    `);

    // Reset form (optional)
    // form.reset();
    // goToStep(1);
  }

  // ============================================
  // RUN INITIALIZATION
  // ============================================
  init();
})();
