<template>
  <div class="form-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      class="form-input"
      :type="type"
      :value="modelValue"
      :maxlength="maxlength"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="ariaDescribedBy" />
    <span v-if="errorMessage" :id="ariaDescribedBy" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
  maxlength: String,
  required: Boolean,
  ariaDescribedBy: String,
  errorMessage: String,
});
</script>
