<template>
  <el-row>
    <el-form
      label-width="130px"
    >
      <el-form-item label="Timezone">
        <el-select v-model="timezone" filterable @change="change" style="width:150px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

       <el-form-item label="Unix Timestamp" style="margin-top: 50px;">
         <el-input v-model="unixTimestampInput" style="width: 102px"/>
         <el-button type="primary" style="margin-left: 15px" @click="confirm1">Confirm</el-button>
         <el-button type="primary" style="margin-left: 15px" @click="now">Now</el-button>
       </el-form-item>
       <el-form-item v-bind:label="timezone">
         <el-input v-model="dateOutput" style="width: 152px" :readonly="true"/>
       </el-form-item>

      <el-form-item v-bind:label="timezone" style="margin-top: 50px;">
        <el-input-number v-model="year" :min="1970" :max="9999" :precision="0" :controls="false" class="input-0"/>
        <span class="inline-flex items-center"><b>/</b></span>
        <el-input-number v-model="month" :min="1" :max="12" :precision="0" :controls="false" class="input-1" />
        <span class="inline-flex items-center"><b>/</b></span>
        <el-input-number v-model="day" :min="1" :max="31" :precision="0" :controls="false" class="input-1" />
        <span class="inline-flex items-center">&nbsp;&nbsp;</span>
        <el-input-number v-model="hour" :min="0" :max="23" :precision="0" :controls="false" class="input-1" />
        <span class="inline-flex items-center"><b>:</b></span>
        <el-input-number v-model="minute" :min="0" :max="59" :precision="0" :controls="false" class="input-1" />
        <span class="inline-flex items-center"><b>:</b></span>
        <el-input-number v-model="second" :min="0" :max="50" :precision="0" :controls="false" class="input-1" />
        <el-button type="primary" style="margin-left: 15px" @click="confirm2">confirm</el-button>
      </el-form-item>
       <el-form-item label="Unix Timestamp">
         <el-input v-model="unixTimestampOutput" style="width: 102px" :readonly="true"/>
       </el-form-item>
    </el-form>
  </el-row>
  <el-row>
    <el-form :inline="true">

    <el-row style="margin-top:10px" class="row-2">
    </el-row>

  </el-form>
    </el-row>
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
      unixTimestampInput: date.unix(),
      dateOutput: date.format('YYYY/MM/DD HH:mm:ss'),

      year: date.year(),
      month: date.month()+1,
      day: date.date(),
      hour: date.hours(),
      minute: date.minutes(),
      second: date.seconds(),
      timezone: moment.tz.guess(),
      unixTimestampOutput: date.unix(),
      options: options,
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
      let date = moment.tz(this.timezone)
      this.unixTimestampInput = date.unix()
      this.dateOutput = date.format('YYYY/MM/DD HH:mm:ss')
    },
    confirm1() {
      let date = moment.unix(this.unixTimestampInput).tz(this.timezone)
      this.unixTimestampInput = date.unix()
      this.dateOutput = date.format('YYYY/MM/DD HH:mm:ss')
    },
    changeV2() {
      let s = this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second
      this.setDate(moment(s).tz(this.timezone))
    },
  }
}

</script>

<style scoped>
.input-0 {
  width: 45px;
}

.input-1 {
  width: 28px;
}

.row-2 span {
  padding-top: 3px;
}

.input-0 ::v-deep(.el-input__wrapper) {
  padding: 1px !important;
}

.input-1 ::v-deep(.el-input__wrapper) {
  padding: 1px !important;
}

::v-deep(.cell) {
 padding-left: 8px !important;
}

::v-deep(.el-form-item__label) {
  background-color: rgb(240, 240, 240);
  border: 1px solid var(--el-border-color);
}

</style>
