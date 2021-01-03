<template>
  <div class="home">
    <el-button @click="gotoTemplate">下载模板</el-button>
    <el-button @click="gotoDownload" type="success">导出</el-button>

    <el-upload
    class="upload-demo"
    drag
    accept=".xlsx, .xls"
    action="https://jsonplaceholder.typicode.com/posts/"
    @change="onExport"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <template #tip>
    </template>
  </el-upload>

    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in headr"
        :key="index"
        :prop="item"
        :label="item"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
import XLSX from 'xlsx'

export default {
  name: 'Home',
  data() {
    return {
      list: [],
      headr: [],
      data: [],
    }
  },

  methods: {
    onExport: function(event) {
      console.log(event.raw, '这是文件')
      this.upload(event.raw)
    },
    upload: function(rawFile) {
      const self = this
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          // console.log(data, '这是文件？')
          const workbook = XLSX.read(data, { type: 'array' })
          // console.log(workbook, '转换成 array')
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          console.log(results, header, '成功？')
          self.data = results
          self.headr = header
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      // console.log(range, '这是范围')
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        // console.log(hdr)
        // console.log(XLSX.utils.format_cell(cell))
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    gotoDownload: function () {
      import('@/utils/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: ['姓名', '年龄', '性别'], // 表头 必填
          data: this.clearData(), // 具体数据 必填
          filename: '全部班级', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        })
      })
    },
    gotoTemplate: function() {
      import('@/utils/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: ['姓名', '年龄', '性别'], // 表头 必填
          data: [], // 具体数据 必填
          filename: '班级模板', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        })
      })
    },

    clearData: function () {
      const title = ['name', 'age', 'sex']
      return this.list.map(r => title.map(s => r[s]))
    },
  },
}
</script>
