<template>
  <el-form :inline="true">
    <el-row>
        <el-form-item label="Unix Timestamp">
          <el-input v-model="unixTimestamp" style="width: 102px"/>
          <el-button type="primary" style="margin-left: 30px" @click="now">Now</el-button>
        </el-form-item>
    </el-row>

    <el-row style="margin-top:10px" class="row-2">
      <el-form-item label="Timezone">
        <el-select v-model="timezone" filterable @change="change" style="width:150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:-30px">
        <span class="inline-flex items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input-number v-model="year" :min="1970" :max="9999" :precision="0" :controls="false" class="input-0"/>
        <span class="inline-flex items-center">&nbsp;-&nbsp;</span>
        <el-input-number v-model="month" :min="1" :max="12" :precision="0" :controls="false" class="input-1"/>
        <span class="inline-flex items-center">&nbsp;-&nbsp;</span>
        <el-input-number v-model="day" :min="1" :max="31" :precision="0" :controls="false" class="input-1"/>
        <span class="inline-flex items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input-number v-model="hour" :min="0" :max="23" :precision="0" :controls="false" class="input-1"/>
        <span class="inline-flex items-center">&nbsp;:&nbsp;</span>
        <el-input-number v-model="minute" :min="0" :max="59" :precision="0" :controls="false" class="input-1"/>
        <span class="inline-flex items-center">&nbsp;:&nbsp;</span>
        <el-input-number v-model="second" :min="0" :max="50" :precision="0" :controls="false" class="input-1"/>
      </el-form-item>
    </el-row>

  </el-form>
  <el-table :data="tableData" border style="width: 360px" :cell-style="{background: 'revert'}" >
    <el-table-column prop="format" label="Format" width="180px" align="center"/>
    <el-table-column prop="date" label="Date" width="180px" align="center" />
  </el-table>
</template>


<script lang="ts">
import moment from 'moment-timezone'
import Moment from 'moment'

export default {
  data() {
    let options:{}[] = []
    moment.tz.names().forEach((value)=>{
      options.push({
        'label': value,
        'value': value,
      })
    })
    let date = moment()
    return {
      unixTimestamp: date.unix(),
      year: date.year(),
      month: date.month()+1,
      day: date.date(),
      hour: date.hours(),
      minute: date.minutes(),
      second: date.seconds(),
      timezone: moment.tz.guess(),
      options: options,
      tableData: [
        {
          format: 'YYYY-MM-DD HH:mm:ss',
          date: date.format('YYYY-MM-DD HH:mm:ss'),
        }
      ],
    }
  },
  methods: {
    setDate(date: Moment.Moment) {
      this.unixTimestamp = date.unix()
      this.year = date.year()
      this.month = date.month()+1
      this.day = date.date()
      this.hour = date.hours()
      this.minute = date.minutes()
      this.second = date.seconds()
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i]['date'] = date.format(this.tableData[i]['format'])
      }
    },
    now() {
      this.setDate(moment.tz(this.timezone))
    },
    change() {
      this.setDate(moment.unix(this.unixTimestamp).tz(this.timezone))
    },
  }
}

</script>

<style scoped>
.input-0 {
  width: 60px;
}

.input-1 {
  width: 45px;
}

.row-2 span {
  padding-top: 3px;
}
</style>
