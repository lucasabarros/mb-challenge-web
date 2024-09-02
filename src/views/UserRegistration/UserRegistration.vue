<template>
  <div id="section-registration">
    <div v-if="alertMessage" :class="`alert ${alertType}`">
      {{ alertMessage }}
    </div>
    <form @submit.prevent="handleSubmit" class="form-container" novalidate>
      <component
        :is="currentStepComponent"
        @validate="handleValidation"
        ref="currentStepComponentRef">
        <template #step-info>
          <div class="step-info">
            Etapa
            <span class="current-step">{{ currentStep }}</span>
            de {{ totalSteps }}
          </div>
        </template>
      </component>

      <div class="form-navigation">
        <button
          v-if="currentStep > 1"
          class="prev-button"
          type="button"
          @click="prevStep">
          Voltar
        </button>
        <button
          v-if="currentStep < totalSteps"
          class="next-button"
          type="button"
          @click="validateAndNextStep">
          Continuar
        </button>
        <button
          v-if="currentStep === totalSteps"
          class="next-button"
          type="submit">
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, provide, watch } from "vue";
import Step1 from "@components/UserRegistration/Step1/Step1.vue";
import Step2 from "@components/UserRegistration/Step2/Step2.vue";
import Step3 from "@components/UserRegistration/Step3/Step3.vue";
import Step4 from "@components/UserRegistration/Step4/Step4.vue";
import {
  validateRequiredField,
  validateEmail,
  validateCpf,
  validateCnpj,
  validateDateNotInFuture,
  validatePhone,
} from "@/utils/validations";
import { useFieldUtilities } from "@/utils/useFormattedField";
import { validatePassword } from "../../utils/validations";

const formData = ref({
  email: "",
  registrationType: "",
  name: "",
  corporateName: "",
  cpf: "",
  cnpj: "",
  birthDate: "",
  foundingDate: "",
  phone: "",
  password: "",
});

const errors = ref({});
const {
  formattedCpf,
  updateCpf,
  formattedCnpj,
  updateCnpj,
  formattedPhone,
  updatePhone,
} = useFieldUtilities(formData, errors);

provide("formData", formData);
provide("errors", errors);
provide("formattedCpf", formattedCpf);
provide("updateCpf", updateCpf);
provide("formattedCnpj", formattedCnpj);
provide("updateCnpj", updateCnpj);
provide("formattedPhone", formattedPhone);
provide("updatePhone", updatePhone);

const alertMessage = ref("");
const alertType = ref("");

const currentStep = ref(1);
const totalSteps = 4;
const steps = [Step1, Step2, Step3, Step4];

const validatePhysicalPerson = (data) => ({
  name: validateRequiredField(data.name, "nome"),
  cpf: validateCpf(data.cpf),
  birthDate: validateDateNotInFuture(data.birthDate, "data de nascimento"),
});

const validateLegalPerson = (data) => ({
  corporateName: validateRequiredField(data.corporateName, "razão social"),
  cnpj: validateCnpj(data.cnpj),
  foundingDate: validateDateNotInFuture(data.foundingDate, "data de abertura"),
});

const validationFunctions = {
  1: () => ({
    email: validateEmail(formData.value.email),
    registrationType: validateRequiredField(
      formData.value.registrationType,
      "tipo de registro"
    ),
  }),
  2: () => {
    const errors = { phone: validatePhone(formData.value.phone) };
    if (formData.value.registrationType === "pf") {
      Object.assign(
        errors,
        validatePhysicalPerson({
          name: formData.value.name,
          cpf: formData.value.cpf,
          birthDate: formData.value.birthDate,
        })
      );
    } else if (formData.value.registrationType === "pj") {
      Object.assign(
        errors,
        validateLegalPerson({
          corporateName: formData.value.corporateName,
          cnpj: formData.value.cnpj,
          foundingDate: formData.value.foundingDate,
        })
      );
    }
    return errors;
  },
  3: () => {
    return {
      password: validatePassword(formData.value.password),
    };
  },
  4: () => {
    const errors = {
      email: validateEmail(formData.value.email),
      phone: validatePhone(formData.value.phone),
      password: validatePassword(formData.value.password),
    };

    if (formData.value.registrationType === "pf") {
      Object.assign(
        errors,
        validatePhysicalPerson({
          name: formData.value.name,
          cpf: formData.value.cpf,
          birthDate: formData.value.birthDate,
        })
      );
    } else if (formData.value.registrationType === "pj") {
      Object.assign(
        errors,
        validateLegalPerson({
          corporateName: formData.value.corporateName,
          cnpj: formData.value.cnpj,
          foundingDate: formData.value.foundingDate,
        })
      );
    }

    return errors;
  },
};

const currentStepComponent = computed(() => steps[currentStep.value - 1]);

const validateCurrentStep = () => {
  const validateFunction = validationFunctions[currentStep.value];
  if (validateFunction) {
    const validationErrors = validateFunction();
    errors.value = validationErrors;
    return Object.values(validationErrors).every((error) => error === "");
  }
  return false;
};

const validateAndNextStep = () => {
  if (validateCurrentStep()) {
    nextStep();
  }
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value += 1;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const handleValidation = () => {
  return validateCurrentStep();
};

const handleSubmit = async () => {
  if (validateCurrentStep()) {
    try {
      const response = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value),
      });

      const result = await response.json();

      if (response.ok) {
        alertMessage.value =
          result.message || "Cadastro realizado com sucesso!";
        alertType.value = "success";

        formData.value = {
          email: "",
          registrationType: "",
          name: "",
          corporateName: "",
          cpf: "",
          cnpj: "",
          birthDate: "",
          foundingDate: "",
          phone: "",
          password: "",
        };

        currentStep.value = 1;
      } else {
        alertMessage.value = result.error || "Ocorreu um erro no cadastro.";
        alertType.value = "error";
        console.error("Erro:", result);
      }
    } catch (error) {
      alertMessage.value = "Ocorreu um erro ao enviar o formulário.";
      alertType.value = "error";
      console.error("Erro:", error);
    }
  }
};

watch(
  () => formData.value.registrationType,
  (newType) => {
    if (newType === "pf") {
      formData.value.corporateName = "";
      formData.value.cnpj = "";
      formData.value.foundingDate = "";
    } else if (newType === "pj") {
      formData.value.name = "";
      formData.value.cpf = "";
      formData.value.birthDate = "";
    }
  }
);

watch(alertMessage, (newMessage) => {
  if (newMessage) {
    setTimeout(() => {
      alertMessage.value = "";
    }, 5000);
  }
});
</script>

<style scoped src="./UserRegistration.scss"></style>
