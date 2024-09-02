<template>
  <div class="form-group">
    <div class="form-radio-group">
      <label v-for="option in options" :key="option.value">
        <input
          type="radio"
          :value="option.value"
          class="form-radio"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)" />
        {{ option.label }}
      </label>
    </div>

    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  modelValue: String,
  options: Array,
  errorMessage: String,
});
</script>

<style scoped></style>
