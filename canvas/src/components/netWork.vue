<template>
  <div class="">
    <canvas :height="networkConfig.height" :width="networkConfig.width" ref="box"></canvas>
  </div>
</template>
<script setup>

import { ref, defineProps, onMounted } from "vue"
import normalImg from '../assets/canvas/normal.png'
import warnImg from '../assets/canvas/warn.png'
import initialImg from '../assets/canvas/initial.png'

const props = defineProps({
  networkConfig: {
    type: Object,
    required: true
  }
});
const box = ref(null)
const nodeMap = ref([])

onMounted(() => {
  nodeMap.value = [];
  const ctx = box.value.getContext('2d');
  const nodeWidth = 40;
  const nodeHeight = 40;
  const rows = props.networkConfig.data.length;
  const cols = props.networkConfig.data[0].length;
  const cellWidth = props.networkConfig.width / cols;
  const cellHeight = props.networkConfig.height / rows;
  const contentWidth = cols * cellWidth;
  const contentHeight = rows * cellHeight;
  const offsetX = (props.networkConfig.width - contentWidth) / 2;
  const offsetY = (props.networkConfig.height - contentHeight) / 2;

  // 绘制所有连线
  props.networkConfig.data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        const x = offsetX + colIndex * cellWidth + (cellWidth - nodeWidth) / 2;
        const y = offsetY + rowIndex * cellHeight + (cellHeight - nodeHeight) / 2;
        cell.info.forEach(link => {
          let startX = x + nodeWidth;
          let startY = y + nodeHeight - 5;
          let endX = startX;
          let endY = startY;
          switch (link.direction) {
            case 'right':
              endX += cellWidth - nodeWidth;
              break;
            case 'bottom':
              startX -= nodeWidth / 2;
              startY += 25;
              endX -= nodeWidth / 2;
              endY += cellHeight - nodeHeight + 3;
              break;
            case 'rightBottom':
              endX += cellWidth - nodeWidth / 2;
              endY += cellHeight - nodeHeight + 3;
              break;
          }
          if (link.lineType === 'dotted') {
            ctx.setLineDash([5, 5]);
          } else {
            ctx.setLineDash([]);
          }
          drawLine(startX, startY, endX, endY);
        });
      }
    });
  });

  // 绘制所有节点和文本
  props.networkConfig.data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        const x = offsetX + colIndex * cellWidth + (cellWidth - nodeWidth) / 2;
        const y = offsetY + rowIndex * cellHeight + (cellHeight - nodeHeight) / 2;
        let img = new window.Image();
        if (cell.status === 0) {
          img.src = normalImg
        } else if (cell.status === 1) {
          img.src = warnImg
        } else {
          img.src = initialImg
        }
        img.onload = () => {
          drawImage(img, x, y, nodeWidth, nodeHeight);
          drawText(cell.name, x, y + nodeHeight + 15, nodeWidth);
        }
        // 记录节点位置信息（用于点击）
        nodeMap.value.push({
          id: cell.id,
          position: [[x, y], [x + nodeWidth, y + nodeHeight + 15]]
        });
      }
    });
  });

  // 点击事件
  box.value.addEventListener('click', (event) => {
    const rect = box.value.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    for (const node of nodeMap.value) {
      if (
        clickX >= node.position[0][0] && clickX <= node.position[1][0] &&
        clickY >= node.position[0][1] && clickY <= node.position[1][1]
      ) {
        const flat = props.networkConfig.data.flat();
        const found = flat.find(n => n && n.id === node.id);
        if (found){
          alert(`点击了${found.name}`);
        }
        break;
      }
    }
  });
});

function drawImage(img, x, y, width, height) {
  const ctx = box.value.getContext('2d');
  ctx.drawImage(img, x, y, width, height);
}
function drawText(text, x, y, nodeWidth) {
  const ctx = box.value.getContext('2d');
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, x + (nodeWidth - textWidth) / 2, y);
}
function drawLine(x1, y1, x2, y2) {
  const ctx = box.value.getContext('2d');
  ctx.strokeStyle = '#696969';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}


</script>
<style lang="scss" scoped>

 canvas {
        border:1px solid;
    }


</style>
