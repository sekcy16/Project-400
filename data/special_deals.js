// ข้อมูลข้อเสนอพิเศษ (Special Deals)
const specialDealsData = [
  {
    id: "2039",
    title: "Steam • Account • GLOBAL",
    sku: "Battlefield 6 Phantom Edition PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/battlefield-6-phantom-edition-pc/49f1af701a5e47f28101a6cd",
    discount: "41.0%",
    link: "#"
  },
  {
    id: "2040",
    title: "Steam • Account • GLOBAL",
    sku: "Peak PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/peak-pc/87af7d3ac0bd414f9f286aea",
    discount: "69.0%",
    link: "#"
  },
  {
    id: "2041",
    title: "EA App • KEY",
    sku: "Battlefield 2042 PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/battlefield-2042-pc/7a882745aa1a482892ad2aa7",
    discount: "10.0%",
    link: "#"
  },
  {
    id: "2042",
    title: "Steam • Key • GLOBAL",
    sku: "Warhammer 40,000: Space Marine 2 PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/warhammer-40000-space-marine-2-pc/85b81c1357dd497384071daf",
    discount: "25.0%",
    link: "#"
  },
  {
    id: "2043",
    title: "Microsoft • Key • GLOBAL",
    sku: "Microsoft Windows 11 Home - PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/microsoft-windows-11-home-pc/170274206c1e4db397c4668e",
    discount: "5.0%",
    link: "#"
  },
  {
    id: "2044",
    title: "Steam • Key • GLOBAL",
    sku: "Total War: THREE KINGDOMS Royal Edition PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/total-war-three-kingdoms-royal-edition-pc/428c0b9fe6f544558d563252",
    discount: "18.0%",
    link: "#"
  },
  {
    id: "2045",
    title: "Microsoft Store • Key • GLOBAL",
    sku: "Minecraft: Java & Bedrock Edition Java & Bedrock Edition PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/minecraft-java-and-bedrock-edition-java-and-bedrock-edition-pc/b2b8cb146e9447d9af4613dd",
    discount: "12.0%",
    link: "#"
  },
  {
    id: "2046",
    title: "RockStar • Key • GLOBAL",
    sku: "Grand Theft Auto V Enhanced PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/grand-theft-auto-v-enhanced-pc/59e5efeb5bafe304c4426c47",
    discount: "8.0%",
    link: "#"
  },
  {
    id: "2047",
    title: "Steam • Gift • GLOBAL",
    sku: "Project Zomboid PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/project-zomboid-pc/5911ec31ae653ab87820ee42",
    discount: "7.0%",
    link: "#"
  },
  {
    id: "2048",
    title: "Steam • Key • GLOBAL",
    sku: "Squad Commander Edition PC",
    image: "https://images.g2a.com/uiadminimages/170x226/1x1x0/squad-commander-edition-pc/5912cc4fae653a844f6059b1",
    discount: "30.0%",
    link: "#"
  }
];

// ฟังก์ชันสำหรับสร้าง HTML ของ Special Deals
function generateSpecialDealsHTML() {
  return specialDealsData.map(item => `
    <a href="${item.link}" class="swiper-slide" title="${item.title}" role="group" data-item-theme="${item.id}">
      <div class="item">
        <div class="img">
          <img class="IconPic lazyloaded" width="54" height="54"
            src="${item.image}"
            alt="${item.title}" />
        </div>
        <div class="content">
          <div class="T">
            <div class="sku">${item.sku}</div>
          </div>
          <div class="name">${item.title}</div>
        </div>
      </div>
      <div class="promo">
        <div class="rate">โปรโมชั่น</div>
        <div class="price">
          <b>-${item.discount}</b>
        </div>
      </div>
    </a>
  `).join('');
}

// Export สำหรับใช้ในไฟล์อื่น
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { specialDealsData, generateSpecialDealsHTML };
}
