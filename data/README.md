# Data Files Documentation

โฟลเดอร์นี้มีไฟล์ข้อมูลสำหรับส่วน Special Deals และ Home Items ของเว็บไซต์

## โครงสร้างไฟล์

```
data/
├── README.md                # คู่มือการใช้งาน
├── index.js                 # ไฟล์หลักสำหรับจัดการข้อมูล
├── special_deals.js         # ข้อมูลข้อเสนอพิเศษ
├── home_items.js           # ข้อมูลรายการสินค้าหน้าแรก
└── data.json               # ข้อมูลในรูปแบบ JSON
```

## การใช้งาน

### 1. ใช้ในไฟล์ HTML

เพิ่ม script tags ในไฟล์ HTML:

```html
<!-- เรียกใช้ไฟล์ข้อมูล -->
<script src="data/special_deals.js"></script>
<script src="data/home_items.js"></script>
<script src="data/index.js"></script>

<script>
  // แทนที่เนื้อหาทั้งหมด
  document.addEventListener('DOMContentLoaded', function() {
    DataManager.replaceAllContent();
  });
</script>
```

### 2. ใช้แยกส่วน

```html
<script>
  // แทนที่เฉพาะ Special Deals
  DataManager.replaceSpecialDealsContent();
  
  // หรือแทนที่เฉพาะ Home Items
  DataManager.replaceHomeItemsContent();
</script>
```

### 3. ใช้ใน Node.js

```javascript
const dataManager = require('./data/index.js');

// ดึงข้อมูลทั้งหมด
const allData = dataManager.getAllData();
console.log(allData);

// ดึงข้อมูลแยกส่วน
const specialDeals = dataManager.specialDeals.specialDealsData;
const homeItems = dataManager.homeItems.homeItemsData;
```

### 4. ใช้ไฟล์ JSON

```javascript
// ใช้ fetch API
fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.specialDeals);
    console.log(data.homeItems);
  });
```

## โครงสร้างข้อมูล

### Special Deals

```javascript
{
  id: "2039",
  title: "Overmortal Vouchers Global",
  sku: "68000 Vouchers",
  image: "https://...",
  discount: "15.0%",
  link: "#"
}
```

### Home Items

```javascript
{
  categories: [
    {
      id: "popular-cards",
      title: "บัตรเติมเงินยอดนิยม",
      moreLink: "src/topup.html",
      items: [
        {
          id: "steam-wallet-thb-1",
          title: "Steam Wallet Code (THB)",
          region: "Thailand",
          image: "https://...",
          link: "/th-th/steam-wallet-card-thailand?ps=Home-Popular-Game-Card"
        }
      ]
    }
  ]
}
```

## ฟังก์ชันที่สามารถใช้ได้

### Special Deals
- `specialDealsData` - ข้อมูลทั้งหมด
- `generateSpecialDealsHTML()` - สร้าง HTML

### Home Items
- `homeItemsData` - ข้อมูลทั้งหมด
- `generateHomeItemsHTML()` - สร้าง HTML ทั้งหมด
- `generateCategoryHTML(category)` - สร้าง HTML ของหมวดหมู่
- `generateItemHTML(item)` - สร้าง HTML ของรายการเดียว

### Data Manager
- `DataManager.loadAllData()` - โหลดข้อมูลทั้งหมด
- `DataManager.replaceAllContent()` - แทนที่เนื้อหาทั้งหมด
- `DataManager.replaceSpecialDealsContent()` - แทนที่เฉพาะ Special Deals
- `DataManager.replaceHomeItemsContent()` - แทนที่เฉพาะ Home Items

## การแก้ไขข้อมูล

1. **Special Deals**: แก้ไขในไฟล์ `special_deals.js`
2. **Home Items**: แก้ไขในไฟล์ `home_items.js`
3. **JSON**: แก้ไขในไฟล์ `data.json`

หลังจากแก้ไขแล้ว หน้าเว็บจะแสดงข้อมูลใหม่โดยอัตโนมัติ

## ตัวอย่างการแก้ไขข้อมูล

### เพิ่มรายการใหม่ใน Special Deals

```javascript
// ใน special_deals.js
const newItem = {
  id: "2049",
  title: "New Game Currency",
  sku: "1000 Coins",
  image: "https://example.com/image.jpg",
  discount: "15.0%",
  link: "#"
};

specialDealsData.push(newItem);
```

### เพิ่มหมวดหมู่ใหม่ใน Home Items

```javascript
// ใน home_items.js
const newCategory = {
  id: "new-category",
  title: "หมวดหมู่ใหม่",
  moreLink: "src/topup.html",
  items: [
    // รายการต่าง ๆ
  ]
};

homeItemsData.categories.push(newCategory);
```
