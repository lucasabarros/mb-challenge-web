<template>
  <div class="form-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="password-container">
      <input
        :id="id"
        class="form-input"
        :type="passwordFieldType"
        v-model="passwordValue"
        :required="required"
        data-testid="password-input"
        :autocomplete="autocomplete"
        aria-describedby="passwordError" />
      <button
        class="toggle-password"
        @click="togglePasswordVisibility"
        type="button"
        aria-label="Alternar visibilidade da senha">
        <img
          v-if="passwordFieldType === 'password'"
          src="@/assets/img/eye-closed.svg"
          alt="Mostrar senha"
          class="password-icon" />
        <img
          v-if="passwordFieldType === 'text'"
          src="@/assets/img/eye.svg"
          alt="Ocultar senha"
          class="password-icon" />
      </button>
    </div>
    <span v-if="error" id="passwordError" class="error-message">{{
      error
    }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Senha",
  },
  id: {
    type: String,
    default: "password",
  },
  required: {
    type: Boolean,
    default: true,
  },
  autocomplete: {
    type: String,
    default: "new-password",
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const passwordFieldType = ref("password");
const passwordValue = ref(props.modelValue);

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

watch(passwordValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped>
.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 8px;
  width: fit-content;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1;
}
</style>
