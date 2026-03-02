import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');

export function useToast() {
  const showToast = (text) => {
    message.value = text;
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, 3000);
  };

  return { isVisible, message, showToast };
}
