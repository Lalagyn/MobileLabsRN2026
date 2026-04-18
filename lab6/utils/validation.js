export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  return typeof password === 'string' && password.trim().length >= 6;
}

export function validateProfile(form) {
  if (!form.name.trim()) {
    return "Поле \"Ім'я\" не може бути порожнім.";
  }

  if (!form.city.trim()) {
    return 'Поле "Місто" не може бути порожнім.';
  }

  if (!/^\d+$/.test(form.age.trim())) {
    return 'Поле "Вік" має містити лише число.';
  }

  return null;
}
