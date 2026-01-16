/* globals Chart:false */

(() => {
  'use strict'

  const ctx = document.getElementById('myChart')

  // 1. สร้างฟังก์ชันเพื่อไปดึงข้อมูลจาก API
  const loadChartData = async () => {
    try {
      // เรียกไปยัง Endpoint ที่คุณตั้งไว้ใน app.js และ router
      const response = await fetch('/api-dashboard/graph')


      const result = await response.json();

      // 2. เมื่อได้ข้อมูลมาแล้ว (result.labels และ result.dataset) ค่อยสร้าง Chart
      new Chart(ctx, {
        type: 'bar',
        data: {
           // ใช้ labels จาก API
          datasets: [{
            label: "Plan",
            data: result.plan, // ใช้ dataset จาก API
            backgroundColor: 'rgba(0, 123, 255, 0.8)',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }, {
            label: "Actual",
            data: result.actual,
            backgroundColor: 'rgba(120, 179, 242, 0.8)',
            borderColor: 'rgba(120, 179, 242, 1)',
            borderWidth: 4,
            pointBackgroundColor: 'rgba(120, 179, 242, 1)'
        }],
          labels: result.labels
        },
        options: {
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              boxPadding: 3
            }
          }
        }
      });
    } catch (error) {
      console.error('ไม่สามารถโหลดข้อมูลกราฟได้:', error);
    }
  }

  // 3. เรียกใช้งานฟังก์ชัน
  loadChartData();

})()