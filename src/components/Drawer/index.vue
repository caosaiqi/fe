<template>
  <el-drawer title="我是标题" :visible.sync="drawer" :size="'50%'">
    <el-form inline>
      <div v-for="(item, index) in configs" style="margin-bottom: 100px" :key="index">
        <div style="padding: 10px; background: red">
          <el-input v-model="item.value" />
        </div>
        <div class="subInputs" style="padding: 20px; background: #eee">
          <span v-for="(sub, uuindex) in item.subConfigs" :key="uuindex">
            <el-input style="width: 200px" v-model="sub.value" size="small" />
          </span>
          <button @click="handleAddsub(item.subConfigs)">++</button>
        </div>
      </div>
      <button @click="handleAddConfig">+</button>
      {{ tableData }}
      <!-- <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180"/>
        </el-table> -->
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      configs: [
        {
          value: '颜色',
          subConfigs: [
            {
              value: '红'
            },
            {
              value: '黄'
            }
          ]
        },
        {
          value: '尺寸',
          subConfigs: [
            {
              value: '14'
            },
            {
              value: '15'
            }
          ]
        }
      ]
    }
  },
  computed: {
    tableData() {
      const _arr = []
      const _tableData = []
      this.configs.forEach(({ value, subConfigs }, index) => {
        const prop = value
        subConfigs.forEach(({ value }) => {
          const o = {
            [prop]: value
          }
          _arr.push(o)
        })
      })
      return _tableData
    }
  },
  methods: {
    handleAddConfig() {
      this.configs.push({
        value: '',
        subConfigs: [
        ]
      })
    },
    handleAddsub(sub) {
      console.log(sub)
      sub.push({
        is: false,
        value: ''
      })
    }
  }
}
</script>

<style>
 .subInputs {
   
 }
</style>
