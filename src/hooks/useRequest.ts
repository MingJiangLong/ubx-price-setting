import { System, post, get } from "@/api/http";
import { AxiosRequestConfig } from "axios";
import { reactive, ref } from "vue";

export async function usePost(sys: System, api: string, data?: any, config?: AxiosRequestConfig<any>) {
  const loading = ref(false);
  const respData = reactive({ value: null })
  const respError = reactive({ value: null })

  async function request() {
    try {
      loading.value = true
      const result = await post(sys, api, data, config)
      respData.value = result;
    } catch (error) {
      respError.value = error
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    resolve: respData.value,
    reject: respError.value,
    invoke: request
  }
}

export function useGet(sys: System, api: string, data?: any, config?: AxiosRequestConfig<any>) {
  const loading = ref(false);
  const respData = reactive({ value: null })
  const respError = reactive({ value: null })

  async function request() {
    try {
      loading.value = true
      const result = await get(sys, api, data, config)
      respData.value = result;
    } catch (error) {
      respError.value = error
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    resolve: respData.value,
    reject: respError.value,
    invoke: request
  }
}