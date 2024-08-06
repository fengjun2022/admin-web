import {computed, ref} from "vue";


export const useLoading = () => {

    const loadingIndex = ref(false)

    const isShow = () => {
        loadingIndex.value = true
    }

    const isHide = () => {
        loadingIndex.value = false

    }

    const loading = computed(() => {
        return loadingIndex.value;
    });


    return {
        loading,
        isShow,
        isHide
    }
}
