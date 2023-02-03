<template>
    <div class="page">
        <div class="page__header">
            Current state:
            <span>
                <Transition name="slide-up" class="absolute">
                    <span :key="currentState" class="font-mono">{{ currentState }}</span>
                </Transition>
            </span>
        </div>

        <div class="page__main">
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStateMachineStore } from '~/stores/state';

const { state } = storeToRefs(useStateMachineStore());

const currentState = computed(() => state.value.value);
</script>

<style>
.page {
    min-height: 80vh;
}

.page, .page__main {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.page__header {
    background-color: cadetblue;
    height: 2rem;
}

.page__main {
    flex-grow: 1;
}

.page__main > * {
    height: 100%;
}
</style>
