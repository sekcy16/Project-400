// ไฟล์สำหรับรวมข้อมูลทั้งหมด
// Import ข้อมูลจากไฟล์อื่น ๆ

// สำหรับใช้ใน browser หรือ HTML
if (typeof window !== 'undefined') {
  // โหลด script files
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // โหลดไฟล์ข้อมูลทั้งหมด
  async function loadAllData() {
    await loadScript('./special_deals.js');
    await loadScript('./home_items.js');
    return {
      specialDeals: typeof specialDealsData !== 'undefined' ? specialDealsData : [],
      homeItems: typeof homeItemsData !== 'undefined' ? homeItemsData : {}
    };
  }

  // ฟังก์ชันสำหรับแทนที่ข้อมูลใน HTML
  function replaceSpecialDealsContent() {
    const container = document.querySelector('#special_deals .list.swiper-wrapper');
    if (container && typeof generateSpecialDealsHTML === 'function') {
      container.innerHTML = generateSpecialDealsHTML();
    }
  }

  function replaceHomeItemsContent() {
    const container = document.querySelector('#featured_items .list.swiper-wrapper');
    if (container && typeof generateHomeItemsHTML === 'function') {
      container.innerHTML = generateHomeItemsHTML();
    }
  }

  // ฟังก์ชันหลักสำหรับแทนที่เนื้อหาทั้งหมด
  function replaceAllContent() {
    replaceSpecialDealsContent();
    replaceHomeItemsContent();
  }

  // Export สำหรับใช้ใน browser
  window.DataManager = {
    loadAllData,
    replaceSpecialDealsContent,
    replaceHomeItemsContent,
    replaceAllContent
  };
}

// สำหรับใช้ใน Node.js
if (typeof module !== 'undefined' && module.exports) {
  const specialDeals = require('./special_deals.js');
  const homeItems = require('./home_items.js');

  module.exports = {
    specialDeals,
    homeItems,
    // ฟังก์ชันยูทิลิตี้
    getAllData: function() {
      return {
        specialDeals: specialDeals.specialDealsData,
        homeItems: homeItems.homeItemsData
      };
    }
  };
}
