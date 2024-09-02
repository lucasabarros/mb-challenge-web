<template>
  <div class="step-container">
    <slot name="step-info"></slot>

    <h2 class="title">Senha de acesso</h2>

    <div class="form-group">
      <PasswordInput
        id="password"
        label="Senha"
        v-model="formData.password"
        autocomplete="new-password"
        :error="errors.password" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import PasswordInput from "@/components/FormInputs/PasswordInput.vue";

const formData = inject("formData");
const errors = inject("errors");

if (!formData || !errors) {
  throw new Error("formData ou errors não estão disponíveis.");
}
</script>

<style scoped></style>
