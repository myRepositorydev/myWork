<script setup>
import netWork from '../components/netWork.vue';
const netWorkConfig = () => {
  const res = {
    data:[
    [
      {name:'网元1',id:'No1',info:[{direction:'right',lineType:'solid'},{direction:'rightBottom',lineType:'dotted'}],status:getRandom()},
      {name:'网元2',id:'No2',info:[{direction:'bottom',lineType:'solid'},{direction:'rightBottom',lineType:'dotted'}],status:getRandom()},
      {name:'网元3',id:'No3',info:[{direction:'bottom',lineType:'solid'},{direction:'rightBottom',lineType:'dotted'}],status:getRandom()},
      null,
    ],
    [
      {name:'网元4',id:'No4',info:[{direction:'right',lineType:'solid'}],status:getRandom()},
      {name:'网元5',id:'No5',info:[{direction:'right',lineType:'solid'},{direction:'bottom',lineType:'solid'}],status:getRandom()},
      {name:'网元6',id:'No6',info:[{direction:'right',lineType:'solid'},{direction:'bottom',lineType:'solid'}],status:getRandom()},
      {name:'网元7',id:'No7',info:[],status:getRandom()},
    ],
    [
      null,
      {name:'网元8',id:'No8',info:[{direction:'right',lineType:'solid'}],status:getRandom()},
      {name:'网元9',id:'No9',info:[],status:getRandom()},
      null,
    ]
    
  ],
  width:500,
  height:400,
  }
  return res
}
//随机函数
const getRandom = () => {
  return Math.floor(Math.random() * 3);
}
</script>

<template>
  <div>
    <net-work :network-config="netWorkConfig()"></net-work>
  </div>

</template>

<style scoped>
</style>
