# 🚀 ИНСТРУКЦИЯ ПО ПУБЛИКАЦИИ САЙТА

Ваш сайт готов к публикации в интернете! Выберите удобный способ:

---

## 📌 СПОСОБ 1: GitHub Pages (РЕКОМЕНДУЮ)

### Шаг 1: Создайте репозиторий на GitHub

1. Откройте https://github.com/new
2. Введите имя репозитория, например: `filantrop-site`
3. Сделайте репозиторий **публичным** (Public)
4. Нажмите **Create repository**

### Шаг 2: Отправьте файлы на GitHub

Откройте Терминал и выполните команды по очереди:

```bash
# Перейдите в папку проекта
cd /Users/georgijanickin/Desktop/визуалкод/filantrop

# Добавьте удалённый репозиторий (замените YOUR_USERNAME на ваш логин GitHub)
git remote add origin https://github.com/YOUR_USERNAME/filantrop-site.git

# Отправьте файлы
git branch -M main
git push -u origin main
```

### Шаг 3: Включите GitHub Pages

1. Откройте ваш репозиторий на GitHub
2. Перейдите в **Settings** → **Pages**
3. В разделе **Source** выберите **main** → **/static** (папка)
4. Нажмите **Save**
5. Через 1-2 минуты сайт будет доступен!

### 📱 Ваш сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/filantrop-site/
```

---

## 📌 СПОСОБ 2: Netlify Drop (БЫСТРО)

### Шаг 1: Откройте Netlify Drop

Перейдите на https://app.netlify.com/drop

### Шаг 2: Перетащите папку

1. Найдите папку `static` на компьютере
2. Перетащите её в окно браузера на Netlify Drop
3. Дождитесь загрузки (30 секунд)

### 📱 Ваш сайт будет доступен по адресу:
```
https://random-name-12345.netlify.app
```

### Шаг 3 (опционально): Зарегистрируйтесь

Чтобы сайт остался у вас навсегда:
1. Создайте аккаунт на Netlify
2. Привяжите сайт к аккаунту
3. Можно изменить имя сайта в настройках

---

## 📌 СПОСОБ 3: Vercel

### Шаг 1: Зарегистрируйтесь

Откройте https://vercel.com/signup

### Шаг 2: Импортируйте проект

1. Нажмите **Add New Project**
2. Выберите **Import Git Repository**
3. Подключите ваш GitHub аккаунт
4. Выберите репозиторий `filantrop-site`
5. В настройках укажите **Root Directory**: `static`
6. Нажмите **Deploy**

### 📱 Ваш сайт будет доступен по адресу:
```
https://filantrop-site.vercel.app
```

---

## 🔗 КАК ОТКРЫТЬ С ТЕЛЕФОНА

После публикации:

1. **Скопируйте ссылку** на сайт (например: `https://yourname.github.io/filantrop-site/`)
2. **Отправьте себе** в Telegram/WhatsApp
3. **Откройте** в браузере телефона

Или:
- Создайте **QR-код** из ссылки (например, на qr-code-generator.com)
- Отсканируйте телефоном

---

## 🎯 ЧТО ДАЛЬШЕ?

### Хотите свой домен (например, filantrop.ru)?

1. Купите домен на reg.ru или nic.ru (~200-500 руб/год)
2. В настройках хостинга (GitHub/Netlify/Vercel) добавьте домен
3. Пропишите DNS записи (инструкция будет на хостинге)

### Нужно изменить контент?

1. Отредактируйте файлы в папке `static`
2. Сохраните изменения
3. Отправьте на GitHub:
   ```bash
   cd /Users/georgijanickin/Desktop/визуалкод/filantrop
   git add -A
   git commit -m "Обновление контента"
   git push
   ```
4. Сайт обновится автоматически через 1-2 минуты

---

## ❓ НУЖНА ПОМОЩЬ?

Если что-то не получается:

1. **GitHub Pages:** https://docs.github.com/en/pages
2. **Netlify:** https://docs.netlify.com
3. **Vercel:** https://vercel.com/docs

---

**Удачи с запуском! 🚀**
