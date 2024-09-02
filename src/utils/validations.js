export const validateRequiredField = (value, fieldName) => {
  return !value ? `Por favor, insira o(a) ${fieldName}.` : "";
};

export const validateEmail = (email) => {
  const requiredError = validateRequiredField(email, "e-mail");
  if (requiredError) {
    return requiredError;
  }

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase())
    ? ""
    : "Por favor, insira um e-mail válido.";
};

export const validateCpf = (cpf) => {
  const requiredFieldError = validateRequiredField(cpf, "cpf");
  if (requiredFieldError) {
    return requiredFieldError;
  }

  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) {
    return "Por favor, insira um cpf válido.";
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return "Por favor, insira um cpf válido.";
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let firstDigit = remainder >= 10 ? 0 : remainder;
  if (parseInt(cpf.charAt(9)) !== firstDigit) {
    return "Por favor, insira um cpf válido.";
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let secondDigit = remainder >= 10 ? 0 : remainder;
  if (parseInt(cpf.charAt(10)) !== secondDigit) {
    return "Por favor, insira um cpf válido.";
  }

  return "";
};

export const validateCnpj = (cnpj) => {
  const requiredFieldError = validateRequiredField(cnpj, "cnpj");
  if (requiredFieldError) return requiredFieldError;

  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) return "Por favor, insira um cnpj válido.";

  if (/^(\d)\1{13}$/.test(cnpj)) return "Por favor, insira um cnpj válido.";

  let sum = 0;
  let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += cnpj.charAt(i) * weight[i];
  }
  let remainder = sum % 11;
  let firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(cnpj.charAt(12)) !== firstDigit)
    return "Por favor, insira um cnpj válido.";

  sum = 0;
  weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += cnpj.charAt(i) * weight[i];
  }
  remainder = sum % 11;
  let secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(cnpj.charAt(13)) !== secondDigit)
    return "Por favor, insira um cnpj válido.";

  return "";
};

export const validateDateNotInFuture = (date) => {
  const requiredFieldError = validateRequiredField(date, "data");
  if (requiredFieldError) return requiredFieldError;

  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    return "A data não pode ser maior que o dia atual.";
  }

  return "";
};

export const validatePhone = (phone) => {
  const requiredFieldError = validateRequiredField(phone, "número de telefone");
  if (requiredFieldError) return requiredFieldError;

  phone = phone.replace(/\D/g, "");

  if (phone.length !== 10 && phone.length !== 11) {
    return "Por favor, insira um número de telefone válido.";
  }

  if (!/^\d+$/.test(phone)) {
    return "Por favor, insira um número de telefone válido.";
  }

  return "";
};

export const validatePassword = (password) => {
  const requiredFieldError = validateRequiredField(password, "senha");
  if (requiredFieldError) {
    return requiredFieldError;
  }

  if (password.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  return "";
};
