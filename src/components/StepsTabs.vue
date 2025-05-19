<template>
  <div class="font-sans">
    <div class="flex justify-between relative mb-5">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center relative flex-1 cursor-pointer"
        :class="{
          active: steps[index].title === activeIndex,
          completed:
            steps.findIndex((step) => step.title === activeIndex) > index,
        }"
        @click="setActive(step.title)"
      >
        <div
          class="w-[24px] h-[24px] rounded-full flex justify-center items-center
          mr-4 text-white text-sm"
          :class="{
            'bg-blue-700': steps[index].title === activeIndex,
            'bg-blue-300':
              steps.findIndex((step) => step.title === activeIndex) > index,
            'bg-gray-300':
              steps.findIndex((step) => step.title === activeIndex) <= index &&
              steps[index].title !== activeIndex,
          }"
        >
          <span
            v-if="steps.findIndex((step) => step.title === activeIndex) > index"
            ><Check :size="12" />
          </span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="flex-1 mr-4 text-center flex items-center">
          {{ step.title }}
          <div
            class="h-0.5 w-8 ml-2 flex-1"
            v-if="index < steps.length - 1"
            :class="{
              'bg-blue-700':
                steps.findIndex((step) => step.title === activeIndex) > index,
              'bg-gray-300':
                steps.findIndex((step) => step.title === activeIndex) <= index,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div class="p-4 border border-gray-300 rounded">
      <slot :name="`step-${activeIndex}`"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps({
  steps: {
    type: Array as () => Array<{ title: string; step: string }>,
    required: true,
  },
  initialStep: {
    type: String,
    required: true,
  },
});
const activeIndex = ref(props.initialStep);

const setActive = (index: string) => {
  activeIndex.value = index;
};
</script>
