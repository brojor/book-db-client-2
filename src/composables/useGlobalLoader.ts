import apiService from '@/services/api';

const apiCalls = ref(0);
const isEnabled = ref(true)
const isLoading = computed(() => apiCalls.value > 0 && isEnabled.value)

apiService.interceptors.request.use(
    (config) => {
        apiCalls.value += 1;
        if (import.meta.env.DEV) {
            return new Promise((resolve) => setTimeout(() => resolve(config), 1500));
        }
        return config;
    },
    (error) => {
        apiCalls.value -= 1;
        return Promise.reject(error);
    }
);

apiService.interceptors.response.use(
    (response) => {
        apiCalls.value -= 1;
        return response;
    },
    (error) => {
        apiCalls.value -= 1;
        return Promise.reject(error);
    }
);

export function useGlobalLoader() {
    const enableLoader = () => {
        isEnabled.value = true;
    };
    
    const disableLoader = () => {
        isEnabled.value = false;
    };

  return { enableLoader, disableLoader, isLoading };
}