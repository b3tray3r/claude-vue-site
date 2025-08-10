// shop-data.js - Данные для магазина Rust

export const categories = {
  privileges: 'Привилегии',
  weapons: 'Оружие',
  ammo: 'Патроны',
  resources: 'Ресурсы',
  comps: 'Компоненты',
  explosives: 'Взрывчатка',
  meds: 'Медикаменты'
}

export const products = {
  
  privileges: [
    {
      id: 'vip-1',
      name: 'Bronze',
      icon: '',
      price: 299,
      duration: '7 дней',
      description: 'Быстрый доступ на сервер в час пик',
      rarity: 'common',
      popular: false,
      image: 'src/assets/lvl1.png'
    },
    {
      id: 'premium-1',
      name: 'Silver',
      icon: '',
      price: 599,
      duration: '14 дней',
      description: 'Быстрый доступ на сервер в час пик',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/lvl2.png'
    },
    {
      id: 'ultimate-1',
      name: 'Gold',
      icon: '',
      price: 999,
      duration: '30 дней',
      description: 'Быстрый доступ на сервер в час пик',
      rarity: 'legendary',
      popular: false,
      image: 'src/assets/lvl3.png'
    }
  ],
  comps: [
    {
    id: "cctv-camera",
    name: "CCTV Camera",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/cctv.camera.png"
  },
  {
    id: "gears",
    name: "Gears",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/gears.png"
  },
  {
    id: "metal-blade",
    name: "Metal Blade",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/metalblade.png"
  },
  {
    id: "metal-pipe",
    name: "Metal Pipe",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
  image: "src/assets/comps/metalpipe.png"
  },
  {
    id: "metal-spring",
    name: "Metal Spring",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/metalspring.png"
  },
  {
    id: "propane-tank",
    name: "Propane Tank",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/propanetank.png"
  },
  {
    id: "rifle-body",
    name: "Rifle Body",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/riflebody.png"
  },
  {
    id: "road-signs",
    name: "Road Signs",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/roadsigns.png"
  },
  {
    id: "rope",
    name: "Rope",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/rope.png"
  },
  {
    id: "semi-body",
    name: "Semi Body",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/semibody.png"
  },
  {
    id: "sewing-kit",
    name: "Sewing Kit",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/sewingkit.png"
  },
  {
    id: "sheet-metal",
    name: "Sheet Metal",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/sheetmetal.png"
  },
  {
    id: "smg-body",
    name: "SMG Body",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/smgbody.png"
  },
  {
    id: "targeting-computer",
    name: "Targeting Computer",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/targeting.computer.png"
  },
  {
    id: "tarp",
    name: "Tarp",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/tarp.png"
  },
  {
    id: "tech-parts",
    name: "Tech Parts",
    price: 100,
    quantity: "1 шт",
    rarity: "common",
    popular: true,
    image: "src/assets/comps/techparts.png"
  }
  ],
  weapons: [
    {
      id: 'm92',
      name: 'M92',

      price: 100,
      quantity: '1 шт',

      rarity: 'common',
      popular: true,
      image: 'src/assets/weapons/pistol.m92.png'
    },
    {
      id: 'double',
      name: 'Double Shotgun',

      price: 100,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/shotgun.double.png'
    },
    {
      id: 'semiauto',
      name: 'Semi-auto Pistol',

      price: 150,
      quantity: '1 шт',

      rarity: 'rare',
      popular: true,
      image: 'src/assets/weapons/pistol.semiauto.png'
    },
    {
      id: 'bolt',
      name: 'Bolt',

      price: 250,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/rifle.bolt.png'
    },
    {
      id: 'gr.launcher',
      name: 'Grenade Launcher',

      price: 250,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/multiplegrenadelauncher.png'
    },
    {
      id: 'flame',
      name: 'Flamethrower',

      price: 250,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/flamethrower.png'
    },
    {
      id: 'rocket',
      name: 'Rocket Launcher',

      price: 250,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/rocket.launcher.png'
    },
    {
      id: 'ak47-1',
      name: 'AK-47',

      price: 150,
      quantity: '1 шт',

      rarity: 'legendary',
      popular: true,
      image: 'src/assets/weapons/rifle.ak.png'
    },
    {
      id: 'lr300-1',
      name: 'LR-300',
      icon: '',
      price: 200,
      quantity: '1 шт',
            rarity: 'legendary',
      popular: false,
      image: 'src/assets/weapons/rifle.lr300.png'
    },
    {
      id: 'thompson-1',
      name: 'Thompson',
      icon: '',
      price: 120,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/weapons/smg.thompson.png'
    },
    {
      id: 'mp5-1',
      name: 'MP5A4',
      icon: '',
      price: 140,
      quantity: '1 шт',
      rarity: 'rare',
      popular: false,
      image: 'src/assets/weapons/smg.mp5.png'
    },
    {
      id: 'shotgun-1',
      name: 'Combat Shotgun',
      icon: '',
      price: 100,
      quantity: '1 шт',
      rarity: 'common',
      popular: false,

      image: 'src/assets/weapons/shotgun.spas12.png'
    }
  ],
  ammo: [
    {
      id: 'ammo.grenadelauncher.he',
      name: 'Снаряд для гранатомета',

      price: 250,
      quantity: '1 шт',

      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.grenadelauncher.he.png'
    },

    {
      id: 'ammo.pistol.fire',
      name: 'Огненые для пистолета',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.pistol.fire.png'
    },
    {
      id: 'ammo.pistol.hv',
      name: 'Скоростные для пистолета',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.pistol.hv.png'
    },
    {
      id: 'ammo.pistol',
      name: 'Обычные для пистолета',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.pistol.png'
    },
    {
      id: 'ammo.rifle.explosive',
      name: 'Взрывные для винтовки',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.rifle.explosive.png'
    },
    {
      id: 'ammo.rifle.hv',
      name: 'Взрывные для винтовки',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.rifle.hv.png'
    },
    {
      id: 'ammo.rifle.incendiary',
      name: 'incendiary для винтовки',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.rifle.incendiary.png'
    },
     {
      id: 'ammo.rifle',
      name: 'обычные для винтовки',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.rifle.png'
    },
    {
      id: 'ammo.shotgun.fire',
      name: 'Oгненые для дробовика',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.shotgun.fire.png'
    },
    {
      id: 'ammo.shotgun',
      name: 'Обычные для дробовика',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.shotgun.png'
    },
    {
      id: 'ammo.shotgun.slug',
      name: 'Слаг какие-то для дробовика',
      price: 250,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/ammo/ammo.shotgun.slug.png'
    },
    
  ],
  resources: [
    {
      id: 'sulfur',
      name: 'Сера',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/resourses/sulfur.png'
    },
    {
      id: 'charcoal',
      name: 'Уголь',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/charcoal.png'
    },
    {
      id: 'crude.oil',
      name: 'Сырая нефть',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/crude.oil.png'
    },
    {
      id: 'explosives',
      name: 'Взрывчатые вещества',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/explosives.png'
    },
    {
      id: 'gunpowder',
      name: 'Порох',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/gunpowder.png'
    },
    {
      id: 'lowgradefuel',
      name: 'Топливо низкого качетва',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/lowgradefuel.png'
    },

     {
      id: 'metal.ore',
      name: 'Железная руда',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/metal.ore.png'
    },
    {
      id: 'metal-fragments-1',
      name: 'Металлические фрагменты',
      icon: '',
      price: 50,
      quantity: '1000 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/resourses/metal.fragments.png'
    },
    {
      id: 'hqm-1',
      name: 'Высококачественная металлическая руда',
      icon: '',
      price: 200,
      quantity: '100 шт',
      rarity: 'legendary',
      popular: true,
      image: 'src/assets/resourses/hq.metal.ore.png'
    },
    {
      id: 'hqm',
      name: 'Метал высокого качества',
      icon: '',
      price: 200,
      quantity: '100 шт',
      rarity: 'legendary',
      popular: true,
      image: 'src/assets/resourses/metal.refined.png'
    },
    {
      id: 'stone-1',
      name: 'Камень',
      icon: '',
      price: 30,
      quantity: '2000 шт',
      rarity: 'common',
      popular: false,
      image: 'src/assets/resourses/stones.png'
    },
    {
      id: 'wood-1',
      name: 'Дерево',
      icon: '',
      price: 25,
      quantity: '2000 шт',
      rarity: 'common',
      popular: false,
      image: 'src/assets/resourses/wood.png'
    },
    {
      id: 'cloth',
      name: 'Ткань',
      icon: '',
      price: 25,
      quantity: '2000 шт',
      rarity: 'common',
      popular: false,
      image: 'src/assets/resourses/cloth.png'
    },
    {
      id: 'leather',
      name: 'Кожа',
      icon: '',
      price: 25,
      quantity: '2000 шт',
      rarity: 'common',
      popular: false,
      image: 'src/assets/resourses/leather.png'
    }
  ],
  meds: [
    {
      id: 'bandage',
      name: 'Бинт',
      icon: '',
      price: 300,
      quantity: '10 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/meds/bandage.png'
    },{
      id: 'syringe',
      name: 'Шприц',
      icon: '',
      price: 300,
      quantity: '5 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/meds/syringe.medical.png'
    },{
      id: 'medkit',
      name: 'Аптечка',
      icon: '',
      price: 300,
      quantity: '1 шт',
      rarity: 'legendary',
      popular: true,
      image: 'src/assets/meds/largemedkit.png'
    },
  ],
  explosives: [
    {
      id: 'c4-1',
      name: 'C4',
      icon: '',
      price: 300,
      quantity: '1 шт',
      rarity: 'legendary',
      popular: true,
      image: 'src/assets/explosives/explosive.timed.png'
    },
    {
      id: 'rocket-1',
      name: 'Ракета',
      icon: '',
      price: 150,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/explosives/ammo.rocket.basic.png'
    },
    {
      id: 'hv-rocket-1',
      name: 'Высокоскоростная ракета',
      icon: '',
      price: 180,
      quantity: '1 шт',
      rarity: 'rare',
      popular: false,
      image: 'src/assets/explosives/ammo.rocket.hv.png'
    },
    {
      id: 'satchel-1',
      name: 'Самодельная бомба',
      icon: '',
      price: 80,
      quantity: '1 шт',
      rarity: 'common',
      popular: false,
      image: 'src/assets/explosives/explosive.satchel.png'
    },
    {
      id: 'mine',
      name: 'Мина',
      icon: '',
      price: 150,
      quantity: '1 шт',
      rarity: 'rare',
      popular: true,
      image: 'src/assets/explosives/trap.landmine.png'
    },
    {
      id: 'grenade-1',
      name: 'Граната F1',
      icon: '',
      price: 40,
      quantity: '3 шт',
      rarity: 'common',
      popular: true,
      image: 'src/assets/explosives/grenade.f1.png'
    }
  ]
}