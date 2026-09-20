/* ==========================================================================
   KUMA Paris — site logic
   Menu rendering, i18n hooks, mobile nav.
   No ordering system — KUMA is walk-in only, no reservations.
   ========================================================================== */

/* ---------- Menu data — single source of truth ----------
   Based on the current KUMA menu (curry + donburi + a few sides & desserts).
   Prices are approximate — confirm with KUMA before publishing.
   To change the menu, edit here. */
const KUMA_MENU = [
  {
    id: "curry", title: "Curry", jp: "カレー",
    note: {
      en: "Our Japanese curry, slow-simmered for hours and served with premium koshihikari rice. Add a nitamago (soft-boiled egg) to any bowl.",
      fr: "Notre curry japonais, mijoté des heures et servi avec un riz koshihikari premium. Ajoutez un nitamago (œuf mollet) à n'importe quel bol.",
      ja: "何時間も煮込んだ自家製ジャパニーズカレー。上質なコシヒカリとともに。半熟卵（味玉）の追加もどうぞ。"
    },
    items: [
      { id: "katsu-curry", name: "Katsu Curry", price: 14, tag: "Signature",
        desc: {
          en: "Panko-breaded pork cutlet over rice with our slow-cooked Japanese curry.",
          fr: "Escalope de porc panée au panko sur riz, nappée de notre curry mijoté.",
          ja: "サクサクのとんかつに、じっくり煮込んだカレー。"
        }},
      { id: "karaage-curry", name: "Karaage Curry", price: 14, tag: "Favourite",
        desc: {
          en: "Marinated Japanese fried chicken — crunchy, juicy — with rice and curry.",
          fr: "Poulet frit à la japonaise mariné, croustillant dehors et juteux dedans, avec riz et curry.",
          ja: "特製ダレの唐揚げ、外はカリッと中はジューシー。ご飯とカレーで。"
        }},
      { id: "chicken-katsu-curry", name: "Chicken Katsu Curry", price: 14,
        desc: {
          en: "Panko-crusted chicken breast, golden and juicy, with rice and curry.",
          fr: "Blanc de poulet pané au panko, doré et juteux, avec riz et curry.",
          ja: "パン粉衣のチキンカツ。外は香ばしく、中はジューシー。"
        }},
      { id: "yasai-curry", name: "Yasai Curry", price: 13, tag: "Veggie",
        desc: {
          en: "Roasted seasonal vegetables — mushroom, aubergine, pumpkin — over rice with curry.",
          fr: "Légumes de saison rôtis — champignons, aubergine, courge — sur riz avec curry.",
          ja: "季節の焼き野菜（きのこ・茄子・かぼちゃ）の野菜カレー。"
        }},
    ],
  },
  {
    id: "donburi", title: "Donburi", jp: "丼",
    note: {
      en: "Rice bowls built on the harmony of premium rice and carefully prepared toppings.",
      fr: "Des bols de riz fondés sur l'harmonie entre un riz premium et des garnitures soigneusement préparées.",
      ja: "上質なお米と丁寧に仕込んだ具材の調和が自慢の丼。"
    },
    items: [
      { id: "karaage-don", name: "Karaage Don", price: 13, tag: "Favourite",
        desc: {
          en: "Japanese fried chicken with a soft-boiled nitamago egg, spring onion and sesame, over rice.",
          fr: "Poulet frit à la japonaise, œuf mollet nitamago, oignon nouveau et sésame, sur riz.",
          ja: "唐揚げと味玉、小ねぎ・胡麻をご飯の上に。"
        }},
      { id: "teriyaki-eggplant", name: "Teriyaki Eggplant Don", price: 13, tag: "Veggie",
        desc: {
          en: "Grilled eggplant glazed with house teriyaki, spring onion, sesame — over rice.",
          fr: "Aubergine grillée glacée au teriyaki maison, oignon nouveau, sésame, sur riz.",
          ja: "自家製照り焼きだれの焼き茄子。小ねぎ・胡麻とご飯で。"
        }},
    ],
  },
  {
    id: "sides", title: "Sides", jp: "一品",
    note: {
      en: "A few small things to round out the bowl.",
      fr: "Quelques petites choses pour accompagner le bol.",
      ja: "丼のお供にちょっとしたひと皿。"
    },
    items: [
      { id: "nitamago", name: "Nitamago (soft-boiled egg)", price: 2,
        desc: {
          en: "A single Japanese soft-boiled egg, marinated. Add it to any bowl.",
          fr: "Un œuf mollet japonais mariné. À ajouter à n'importe quel bol.",
          ja: "半熟の味玉、一個。丼に一つ添えて。"
        }},
      { id: "miso-soup", name: "Miso Soup", price: 3,
        desc: {
          en: "Classic miso broth with tofu, wakame and spring onion.",
          fr: "Bouillon miso classique, tofu, wakamé et oignon nouveau.",
          ja: "豆腐・わかめ・ねぎ入りの定番味噌汁。"
        }},
    ],
  },
  {
    id: "desserts", title: "Desserts", jp: "甘味",
    note: {
      en: "A small, quiet sweet ending — homemade.",
      fr: "Une fin douce, discrète et faite maison.",
      ja: "静かで甘い、自家製の締めくくり。"
    },
    items: [
      { id: "black-sesame-cheesecake", name: "Black Sesame Cheesecake", price: 6,
        desc: {
          en: "Baked cheesecake with roasted black sesame, served with a fruit compote.",
          fr: "Cheesecake au sésame noir torréfié, compote de fruits.",
          ja: "焦がし黒胡麻のベイクドチーズケーキ、フルーツコンポートを添えて。"
        }},
      { id: "mochi-mangue", name: "Mochi Mangue", price: 5,
        desc: {
          en: "House-made mango mochi.",
          fr: "Mochi à la mangue, fait maison.",
          ja: "自家製のマンゴー餅。"
        }},
    ],
  },
  {
    id: "drinks", title: "Drinks", jp: "飲物",
    note: null,
    items: [
      { id: "yuzu-lemonade", name: "Limonade Yuzu", price: 4,
        desc: {
          en: "House-made, gently sparkling yuzu lemonade.",
          fr: "Limonade yuzu maison, légèrement pétillante.",
          ja: "自家製の微炭酸ゆずレモネード。"
        }},
      { id: "green-tea", name: "Sencha Green Tea", price: 3,
        desc: {
          en: "Hot or iced.",
          fr: "Chaud ou glacé.",
          ja: "ホットまたはアイス。"
        }},
      { id: "japanese-beer", name: "Japanese Beer", price: 5,
        desc: {
          en: "33cl bottle.",
          fr: "Bouteille 33 cl.",
          ja: "瓶ビール 330ml。"
        }},
    ],
  },
];

/* ---------- Helpers ---------- */

const CURRENCY = "€";
const fmt = (n) => CURRENCY + n.toFixed(2).replace(/\.00$/, "");
const loc8 = (v) => (typeof v === "object" && v !== null ? (v[Lang.get()] || v.en) : v);

/* ---------- Boot ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => mobileNav?.classList.toggle("is-open"));

  // Menu page: render full menu if the mount point exists
  const menuMount = document.querySelector("[data-menu-mount]");
  function renderMenu() {
    if (!menuMount) return;
    menuMount.innerHTML = KUMA_MENU.map((cat) => `
      <section class="menu-section section--tight container" id="${cat.id}">
        <div class="menu-section__head">
          <h2 class="headline-lg">${cat.title}</h2>
          <span class="jp menu-section__jp">${cat.jp}</span>
        </div>
        ${cat.note ? `<p class="menu-section__note muted">${loc8(cat.note)}</p>` : ""}
        <div class="menu-items">
          ${cat.items.map((i) => `
            <div class="menu-item">
              <div class="menu-item__body">
                <div class="menu-item__row">
                  <h3 class="menu-item__name">${i.name}${i.tag ? `<span class="menu-item__tag">${t("tag." + i.tag)}</span>` : ""}</h3>
                  <span class="menu-item__price">${fmt(i.price)}</span>
                </div>
                <p class="menu-item__desc">${loc8(i.desc)}</p>
              </div>
            </div>`).join("")}
        </div>
      </section>`).join('<hr class="rule container" style="max-width:1200px">');

    const nav = document.querySelector("[data-menu-nav]");
    if (nav) nav.innerHTML = KUMA_MENU.map((c) => `<a class="label-caps" href="#${c.id}">${c.title}</a>`).join("");
  }

  renderMenu();

  // Re-render dynamic content when the language changes
  window.addEventListener("kuma:lang", () => {
    renderMenu();
  });
});
