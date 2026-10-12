const homeChip = document.getElementById('homeChip');
      const toastEl = document.querySelector('.toast');

      const setToast = (message) => {
        if (!toastEl) return;
        toastEl.textContent = message;
      };

      const navButtons = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.section');

      const showSection = (targetId) => {
        navButtons.forEach((item) => item.classList.toggle('active', item.dataset.target === targetId));
        sections.forEach((section) => section.classList.toggle('active', section.id === targetId));
      };

      navButtons.forEach((button) => {
        button.addEventListener('click', () => showSection(button.dataset.target));
      });

      const startShiftBtn = document.getElementById('startShiftBtn');
      const expandChecklistBtn = document.getElementById('expandChecklistBtn');
      const changeShiftBtn = document.getElementById('changeShiftBtn');

      startShiftBtn?.addEventListener('click', () => {
        homeChip.textContent = 'shift';
        setToast('Смена запущена. Чек-лист активирован и синхронизирован с диспетчером.');
        showSection('tasks');
      });

      expandChecklistBtn?.addEventListener('click', () => {
        const taskList = document.getElementById('taskList');
        const extraItem = document.createElement('div');
        extraItem.className = 'task';
        extraItem.setAttribute('data-state', 'active');
        extraItem.tabIndex = 0;
        extraItem.innerHTML = `
          <div class="number">4</div>
          <div>
            <strong>Проверить постовой журнал</strong>
            <small>Подписи, отметки, сдвиги смен</small>
          </div>
          <span class="badge red">в работе</span>
        `;

        if (!taskList.querySelector('[data-state="active"][data-extra="true"]')) {
          extraItem.dataset.extra = 'true';
          taskList.appendChild(extraItem);
          setToast('Дополнительный пункт добавлен в чек-лист.');
        }

        showSection('tasks');
      });

      changeShiftBtn?.addEventListener('click', () => {
        homeChip.textContent = 'online';
        setToast('Смена обновлена. Доступ к панели восстановлен.');
        showSection('home');
      });

      const taskItems = document.querySelectorAll('.task');
      taskItems.forEach((item) => {
        item.addEventListener('click', () => {
          const state = item.dataset.state;
          const isDone = state === 'done';

          item.dataset.state = isDone ? 'active' : 'done';
          const badge = item.querySelector('.badge');
          badge.classList.toggle('green', !isDone);
          badge.classList.toggle('red', isDone);
          badge.textContent = isDone ? 'в работе' : 'готово';

          setToast(isDone ? 'Пункт переведён в работу.' : 'Пункт отмечен как выполненный.');
        });
      });