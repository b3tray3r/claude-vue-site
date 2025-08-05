// ===== КОНФИГУРАЦИЯ МАГАЗИНА =====
export const SHOP_CONFIG = {
    // Категории товаров
    CATEGORIES: {
        privilege: 'Привелегии',
        subscriptions: 'Подписки',
        items: 'Предметы',
        access: 'Доступы',
        kits: 'Наборы'
        
    },

    // Анимации
    ANIMATION: {
        CARD_DELAY: 100,
        TRANSITION_DURATION: 300
    }
};

// ===== ДАННЫЕ ТОВАРОВ =====
export const SHOP_DATA = {
    subscriptions: [
        {
            id: 'gold',
            name: 'Gold',
            price: 699,
            icon: '🥇',
            description: 'Золотой статус с отличными привилегиями',
            features: [
                'Приоритетная очередь',
                'Увеличенный лимит построек',
                'Дополнительные команды',
                'Золотые скины оружия',
                'Увеличенная скорость крафта',
                'Защита от голода и жажды',
                'Доступ к Gold зонам'
            ],
            duration: '30 дней',
            class: 'gold'
        },
        {
            id: 'silver',
            name: 'Silver',
            price: 399,
            icon: '🥈',
            description: 'Серебряный статус для комфортной игры',
            features: [
                'Быстрое подключение',
                'Дополнительные слоты инвентаря',
                'Базовые привилегии',
                'Серебряные скины',
                'Увеличенное здоровье',
                'Защита от холода'
            ],
            duration: '30 дней',
            class: 'silver popular'
        },
        {
            id: 'bronze',
            name: 'Bronze',
            price: 199,
            icon: '🥉',
            description: 'Бронзовый статус для начинающих',
            features: [
                'Базовые привилегии',
                'Бронзовые скины',
                'Дополнительные слоты',
                'Базовая защита',
                'Стартовые бонусы'
            ],
            duration: '30 дней',
            class: 'bronze'
        }
    ],

    items: [
        {
            id: 'ak47_skin',
            name: 'AK-47 Огненный',
            price: 299,
            icon: '🔫',
            description: 'Эксклюзивный скин для автомата AK-47',
            features: [
                'Уникальный огненный дизайн',
                'Светящиеся элементы',
                'Статистика убийств',
                'Персональная гравировка'
            ],
            class: 'weapon-skin'
        },
        {
            id: 'armor_set',
            name: 'Набор брони Титан',
            price: 499,
            icon: '🛡️',
            description: 'Полный комплект защитной экипировки',
            features: [
                'Максимальная защита',
                'Устойчивость к радиации',
                'Ночное видение',
                'Встроенный регенератор'
            ],
            class: 'armor'
        },
        {
            id: 'helicopter',
            name: 'Личный вертолёт',
            price: 1299,
            icon: '🚁',
            description: 'Персональный транспорт для быстрых перемещений',
            features: [
                'Высокая скорость',
                'Броневая защита',
                'Встроенное оружие',
                'Система автопилота'
            ],
            class: 'vehicle popular'
        }
    ],

    access: [
        {
            id: 'moderator',
            name: 'Права Модератора',
            price: 1499,
            icon: '🛡️',
            description: 'Возможности для поддержания порядка на сервере',
            features: [
                'Кик и бан игроков',
                'Мут в чате',
                'Телепортация',
                'Просмотр логов'
            ],
            duration: '1 месяц',
            class: 'moderator'
        },
        {
            id: 'builder',
            name: 'Права Строителя',
            price: 899,
            icon: '🔨',
            description: 'Специальные возможности для строительства',
            features: [
                'Неограниченные ресурсы',
                'Режим полёта',
                'Быстрое строительство',
                'Защита построек'
            ],
            duration: '1 месяц',
            class: 'builder'
        },
        {
            id: 'vip_zone',
            name: 'VIP Зона',
            price: 599,
            icon: '🌟',
            description: 'Доступ к эксклюзивным областям сервера',
            features: [
                'Безопасная торговля',
                'Эксклюзивные ресурсы',
                'Особые НПЦ',
                'PvP-free зона'
            ],
            duration: '1 месяц',
            class: 'zone'
        }
    ],

    kits: [
        {
            id: 'starter_kit',
            name: 'Стартовый набор',
            price: 99,
            icon: '🎒',
            description: 'Всё необходимое для успешного старта',
            features: [
                'Базовые инструменты',
                'Запас еды и воды',
                'Простая одежда',
                'Стартовые ресурсы'
            ],
            class: 'starter popular'
        },
        {
            id: 'military_kit',
            name: 'Военный набор',
            price: 799,
            icon: '⚔️',
            description: 'Полное военное снаряжение для PvP',
            features: [
                'Штурмовая винтовка',
                'Бронежилет и шлем',
                'Патроны и гранаты',
                'Медикаменты'
            ],
            class: 'military'
        },
        {
            id: 'builder_kit',
            name: 'Набор Строителя',
            price: 599,
            icon: '🏠',
            description: 'Материалы и инструменты для строительства',
            features: [
                'Строительные материалы',
                'Молоток и план',
                'Замки и двери',
                'Декоративные элементы'
            ],
            class: 'builder'
        }
    ],
    privilege: [
        {
            id: 'vip_que_3',
            name: 'Приоритетная очередь',
            price: 299,
            icon: '⏳',
            description: 'Приоритетная очередь на сервере',
            features: ['Доступ на сервер в час пик, без очереди'],
            duration: '3 дня',
            class: 'queue_3',
            image: 'https://i.imgur.com/XwCH9ri.png'
        },
        {
            id: 'vip_que_7',
            name: 'Приоритетная очередь',
            price: 499,
            icon: '⏳',
            description: 'Приоритетная очередь на сервере',
            features: ['Доступ на сервер в час пик, без очереди'],
            duration: '14 дней',
            class: 'queue_7 popular',
            image: 'https://i.imgur.com/1AYPipy.png'
        },
        {
            id: 'vip_que_30',
            name: 'Приоритетная очередь',
            price: 999,
            icon: '⏳',
            description: 'Приоритетная очередь на сервере',
            features: ['Доступ на сервер в час пик, без очереди'],
            duration: '30 дней',
            class: 'queue_30',
            image: 'https://i.imgur.com/BWRvU39.png'
        }

    ]
};