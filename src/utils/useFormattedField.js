import { computed } from "vue";
import { formatCpf, formatCnpj, formatPhone } from "./format";
import { validateCpf, validateCnpj, validatePhone } from "./validations";

export function useFormattedField(
  formData,
  fieldName,
  formatFunc,
  validateFunc,
  errors
) {
  const formattedField = computed({
    get() {
      return formData.value[fieldName]
        ? formatFunc(formData.value[fieldName])
        : "";
    },
    set(value) {
      const cleanValue = value ? value.replace(/\D/g, "") : "";
      formData.value[fieldName] = cleanValue;
      errors.value[fieldName] = validateFunc(cleanValue);
    },
  });

  const updateField = (event) => {
    const newValue = event.target.value
      ? event.target.value.replace(/\D/g, "")
      : "";
    formData.value[fieldName] = newValue;
    errors.value[fieldName] = validateFunc(newValue);
  };

  return { formattedField, updateField };
}

export function useFieldUtilities(formData, errors) {
  const cpfUtilities = useFormattedField(
    formData,
    "cpf",
    formatCpf,
    validateCpf,
    errors
  );
  const cnpjUtilities = useFormattedField(
    formData,
    "cnpj",
    formatCnpj,
    validateCnpj,
    errors
  );
  const phoneUtilities = useFormattedField(
    formData,
    "phone",
    formatPhone,
    validatePhone,
    errors
  );

  return {
    formattedCpf: cpfUtilities.formattedField,
    updateCpf: cpfUtilities.updateField,
    formattedCnpj: cnpjUtilities.formattedField,
    updateCnpj: cnpjUtilities.updateField,
    formattedPhone: phoneUtilities.formattedField,
    updatePhone: phoneUtilities.updateField,
  };
}
