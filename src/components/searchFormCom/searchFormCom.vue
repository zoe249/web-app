<template>
  <!-- 搜索组件 -->
  <div>
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item
        v-for="(item, index) in formLabel"
        :key="index"
        :label="item.label"
      >
        <!-- 普通输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model.trim="formData[item.prop]"
          :style="{ width: item.width }"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
        >
          <el-option
            v-for="(selectItem, index) in item.options"
            :key="index"
            :label="selectItem.label"
            :value="selectItem.value"
          ></el-option>
        </el-select>
        <!-- 时间 -->
        <el-date-picker
          v-else-if="item.type === 'time'"
          v-model="formData[item.prop]"
          type="datetime"
          :placeholder="item.placeholder"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item>
        <!-- 组件插槽 -->
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    formLabel: {
      type: Array,
      default() {
        return []
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 时间
      dateValue: {}
    }
  }
}
</script>
