<template>
  <el-form ref="creavieForm" :model="formData" label-width="120px">
    {{ formData }}
    <el-form-item label="投放日期" prop="time">
      <el-date-picker
        v-model="formData.time"
        :default-time="formData.time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </el-form-item>
    <el-form-item label="展现是否限量" prop="limit_status" style="width: 400px">
      <RadioGroup v-model="formData.limit_status" :items="limitStatusItems" />
    </el-form-item>
    <el-form-item label="展示标签" prop="show_tag" style="width: 800px">
      <RadioGroup v-model="formData.show_tag" :items="showTagItems" />
    </el-form-item>
  </el-form>
</template>

<script>
import RadioGroup from '@@/RadioGroup'
import InputNumber from '@@/InputNumber'

export default {
  name: 'NadCreavieForm',
  components: {
    RadioGroup
  },
  data() {
    return {
      formData: {
        time: '',
        limit_status: 0,
        limit_num: 123,
        show_tag: 1,
        show_tag_text: ''
      },
      limitStatusItems: [
        {
          label: '不限量',
          value: 0
        },
        {
          label: '限量',
          value: 1,
          content: () => {
            return <InputNumber v-model={this.formData.limit_num} placeholder='请输入限量次数' append='次' />
          }
        }
      ],
      showTagItems: [
        {
          label: '内容推荐(自定义标签)',
          value: 1,
          content: () => {
            return <el-input v-model={this.formData.show_tag_text} maxlength='5' placeholder='非必填，最多5字' show-word-limit />
          }
        },
        {
          label: '公告(重要，一定显示)',
          value: 0
        },
        {
          label: '三方广告(加标签)',
          value: 2
        }
      ]
    }
  }
}
</script>

