<template>
  <div class="step-container">
    <slot name="step-info"></slot>

    <h2 class="title">Revise suas informações</h2>

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

    <template v-if="formData.registrationType === 'pf'">
      <BaseInput
        id="name"
        label="Nome"
        type="text"
        v-model="formData.name"
        maxlength="50"
        required
        autocomplete="name"
        ariaDescribedBy="nameError"
        :errorMessage="errors.name" />

      <div class="form-group">
        <label for="cpf" class="form-label">CPF</label>
        <input
          id="cpf"
          class="form-input"
          type="text"
          v-model="formattedCpf"
          @input="updateCpf"
          maxlength="14"
          required
          autocomplete="cpf"
          aria-describedby="cpfError" />
        <span v-if="errors.cpf" id="cpfError" class="error-message">
          {{ errors.cpf }}
        </span>
      </div>

      <BaseInput
        id="birthDate"
        label="Data de Nascimento"
        type="date"
        v-model="formData.birthDate"
        required
        autocomplete="bdate"
        aria-describedby="birthDateError"
        :errorMessage="errors.birthDate" />
    </template>

    <template v-else>
      <BaseInput
        id="corporateName"
        label="Razão Social"
        type="text"
        v-model="formData.corporateName"
        maxlength="50"
        required
        autocomplete="organization"
        aria-describedby="corporateNameError"
        :errorMessage="errors.corporateName" />

      <div class="form-group">
        <label for="cnpj" class="form-label">CNPJ</label>
        <input
          id="cnpj"
          class="form-input"
          type="text"
          v-model="formattedCnpj"
          @input="updateCnpj"
          maxlength="18"
          required
          autocomplete="cnpj"
          aria-describedby="cnpjError" />
        <span v-if="errors.cnpj" id="cnpjError" class="error-message">
          {{ errors.cnpj }}
        </span>
      </div>

      <BaseInput
        id="foundingDate"
        label="Data de Abertura"
        type="date"
        v-model="formData.foundingDate"
        required
        autocomplete="bdate"
        aria-describedby="foundingDateError"
        :errorMessage="errors.foundingDate" />
    </template>

    <div class="form-group">
      <label for="phone" class="form-label">Telefone</label>
      <input
        id="phone"
        class="form-input"
        type="text"
        v-model="formattedPhone"
        @input="updatePhone"
        maxlength="15"
        required
        autocomplete="tel"
        aria-describedby="phoneError" />
      <span v-if="errors.phone" id="phoneError" class="error-message">
        {{ errors.phone }}
      </span>
    </div>

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
import { inject } from "vue";
import BaseInput from "@/components/FormInputs/BaseInput.vue";
import PasswordInput from "@/components/FormInputs/PasswordInput.vue";

const formData = inject("formData");
const errors = inject("errors");
const formattedCpf = inject("formattedCpf");
const updateCpf = inject("updateCpf");
const formattedCnpj = inject("formattedCnpj");
const updateCnpj = inject("updateCnpj");
const formattedPhone = inject("formattedPhone");
const updatePhone = inject("updatePhone");

if (!formData || !errors) {
  throw new Error("Faltando alguma injeção.");
}
</script>

<style scoped></style>
