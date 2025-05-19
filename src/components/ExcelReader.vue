<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".xlsx" />
    <Button type="primary" @click="parseExcel">解析Excel</Button>
    <pre>{{ parsedData }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const file = ref<File | null>(null);
const parsedData = ref([] as TypeItem[]);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    file.value = input.files[0];
  }
};
type TypeItem = {
  date: string;
  tenBefore: { all: number; green: number };
  morning: { all: number; green: number };
  all: { all: number; green: number };
  noTrading: { all: number; green: number };
};
const parseExcel = () => {
  if (!file.value) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target?.result;

    const workbook = XLSX.read(data, { type: 'binary' });
    console.log(workbook);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);
    console.log(jsonData);

    parsedData.value = jsonData.map((item: any) => {
      console.log(item);
      return({
      date: item.日期,
      tenBefore: {
        all: item['十点前']?.slice(2, 1) || 0,
        green: item['十点前']?.slice(0, 1) || 0,
      },
      morning: {
        all: item['上午']?.slice(2, 1) || 0,
        green: item['上午']?.slice(0, 1) || 0,
      },
      all: {
        all: item['全部']?.slice(2, 1) || 0,
        green: item['全部']?.slice(0, 1) || 0,
      },
      noTrading: {
        all: item['收盘未涨停次日绿']?.slice(2, 1) || 0,
        green: item['收盘未涨停次日绿']?.slice(0, 1) || 0,
      },
    })})

    emit('data-loaded', parsedData.value);
  };
  reader.readAsBinaryString(file.value);
};

const emit = defineEmits(['data-loaded']);
</script>

