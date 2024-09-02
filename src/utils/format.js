export const formatCpf = (cpf) => {
  cpf = cpf ? cpf.replace(/\D/g, "") : "";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatCnpj = (cnpj) => {
  cnpj = cnpj ? cnpj.replace(/[^\d]+/g, "") : "";
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export const formatPhone = (phone) => {
  phone = phone ? phone.replace(/\D/g, "") : "";
  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else {
    return phone.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
};
