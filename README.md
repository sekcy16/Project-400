# Gaming Website

เว็บไซต์เกมที่ใช้ SCSS สำหรับการจัดการ CSS และมี responsive design

## โครงสร้างโปรเจค

```
Project/
├── index.html              # หน้าหลัก
├── package.json           # Node.js dependencies
├── start-dev.bat          # Script สำหรับเริ่มพัฒนา
├── css/
│   └── style.css          # CSS ที่ compile แล้ว
├── js/
│   └── script.js          # JavaScript สำหรับ interactive features
└── scss/                  # SCSS source files
    ├── style.scss         # Main SCSS file
    ├── _variables.scss    # Variables (สี, ขนาด, ฯลฯ)
    ├── _base.scss         # Base styles และ mixins
    ├── _global-header.scss # Global header styles
    ├── _main-header.scss  # Main header styles
    ├── _banner.scss       # Banner slider styles
    └── _responsive.scss   # Responsive design
```

## การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. Compile SCSS
```bash
# Compile ครั้งเดียว
npm run scss

# Watch mode (compile อัตโนมัติเมื่อมีการแก้ไข)
npm run scss:watch

# Compile แบบ compressed สำหรับ production
npm run build
```

### 3. เริ่มพัฒนา
```bash
# ใช้ npm script
npm run dev

# หรือใช้ batch file (Windows)
start-dev.bat
```

## ฟีเจอร์หลัก

### Headers
- **Global Header**: ข่าวสาร, โปรโมชั่น, เลือกประเทศ
- **Main Header**: Logo, เมนูหมวดหมู่, ช่องค้นหา, โปรไฟล์

### Banner Slider
- แสดงเกมต่างๆ แบบ slideshow
- เปลี่ยนอัตโนมัติทุก 5 วินาที
- สามารถเลื่อนด้วยปุ่มหรือ indicator
- รองรับการ swipe บนมือถือ
- รองรับ keyboard navigation (ลูกศรซ้าย-ขวา)

### Responsive Design
- ปรับตัวสำหรับ Mobile (≤480px)
- ปรับตัวสำหรับ Tablet (≤768px)
- ปรับตัวสำหรับ Desktop (≥1024px)

## SCSS Features

### Variables
- สีต่างๆ (primary, secondary, banner colors)
- ขนาดต่างๆ (spacing, font sizes, border radius)
- Breakpoints สำหรับ responsive
- Z-index values

### Mixins
- `@mixin flex-center` - Flexbox center alignment
- `@mixin flex-between` - Flexbox space-between
- `@mixin button-base` - Base button styles
- `@mixin button-primary` - Primary button styles
- `@mixin link-base` - Base link styles
- `@mixin card-shadow` - Card shadow effect
- `@mixin text-shadow` - Text shadow with opacity

### Responsive Mixins
- `@mixin mobile` - Mobile styles
- `@mixin tablet` - Tablet styles
- `@mixin desktop` - Desktop styles

## การปรับแต่ง

### เปลี่ยนสี
แก้ไขไฟล์ `scss/_variables.scss`:
```scss
$primary-color: #4CAF50;      // สีหลัก
$secondary-color: #2c3e50;    // สีรอง
$banner-color-1: #FF6B6B;     // สี banner 1
```

### เปลี่ยนขนาด
แก้ไขไฟล์ `scss/_variables.scss`:
```scss
$container-max-width: 1200px; // ความกว้างสูงสุด
$spacing-xl: 20px;            // ระยะห่าง
```

### เพิ่ม Component ใหม่
1. สร้างไฟล์ `scss/_component-name.scss`
2. เพิ่ม `@use 'component-name';` ใน `scss/style.scss`
3. Run `npm run scss` เพื่อ compile

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with some limitations)

## สิ่งที่ต้องทำต่อ
- [ ] เพิ่มหน้าอื่นๆ (เกม, การ์ด, เติมเงิน)
- [ ] เพิ่ม dropdown menu สำหรับ user profile
- [ ] เพิ่ม country selector dropdown
- [ ] เพิ่ม dark mode
- [ ] เพิ่ม loading animations
- [ ] เพิ่ม unit tests
