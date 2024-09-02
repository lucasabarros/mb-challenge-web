<template>
  <div class="step-container">
    <slot name="step-info"></slot>

    <h2 class="title">Seja bem-vindo(a)</h2>

    <BaseInput
      id="email"
      label="Endereço de e-mail"
      type="email"
      v-model="formData.email"
      maxlength="50"
      required
      autocomplete="email"
      ariaDescribedBy="emailError"
      :errorMessage="errors.email" />

    <RadioGroup
      :options="registrationOptions"
      v-model="formData.registrationType"
      :errorMessage="errors.registrationType" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import BaseInput from "@components/FormInputs/BaseInput.vue";
import RadioGroup from "@components/FormInputs/RadioGroupInput.vue";

const formData = inject("formData");
const errors = inject("errors");

if (!formData || !errors) {
  throw new Error("formData ou errors não estão disponíveis.");
}

const registrationOptions = [
  { value: "pf", label: "Pessoa Física" },
  { value: "pj", label: "Pessoa Jurídica" },
];
</script>

<style scoped></style>
