export type SlideType = {
    id: number,
    title: string
    periodStart: number
    periodEnd: number
    details: {
        date: number
        description: string
    }[]
}

const slides: SlideType[] = [
    {
        id: 1,
        title: 'Литература',
        periodStart: 1992,
        periodEnd: 1997,
        details: [
            {
                date: 1992,
                description: 'Нобелевская премия по литературе - Дерек Уолкотт, "За блестящий образец карибского эпоса в 64 разделах"'
            },
            {
                date: 1993,
                description: 'Выход романа "Бесконечная шутка" Дэвида Фостера Уоллеса'
            },
            {
                date: 1994,
                description: 'Публикация романа "Институт" Стивена Кинга'
            },
            {
                date: 1995,
                description: 'Первая книга о Гарри Поттере - "Гарри Поттер и философский камень"'
            }
        ]
    },
    {
        id: 2,
        title: 'Технологии',
        periodStart: 1995,
        periodEnd: 2000,
        details: [
            {
                date: 1995,
                description: 'Основание компании Amazon Джеффом Безосом'
            },
            {
                date: 1996,
                description: 'Создание поисковой системы Google Ларри Пейджем и Сергеем Брином'
            },
            {
                date: 1998,
                description: 'Запуск операционной системы Windows 98'
            },
            {
                date: 1999,
                description: 'Появление технологии Wi-Fi для беспроводной связи'
            },
            {
                date: 2000,
                description: 'Первый смартфон с сенсорным экраном - Ericsson R380'
            }
        ]
    },
    {
        id: 3,
        title: 'Кино',
        periodStart: 1999,
        periodEnd: 2003,
        details: [
            {
                date: 1999,
                description: 'Выход фильма "Матрица" - революция в спецэффектах'
            },
            {
                date: 2001,
                description: 'Премьера первой части "Властелина колец" - "Братство кольца"'
            },
            {
                date: 2002,
                description: 'Фильм "Поймай меня, если сможешь" с Леонардо ДиКаприо и Томом Хэнксом'
            }
        ]
    },
    {
        id: 4,
        title: 'Наука',
        periodStart: 2000,
        periodEnd: 2005,
        details: [
            {
                date: 2000,
                description: 'Завершение проекта "Геном человека" - расшифровка ДНК человека'
            },
            {
                date: 2001,
                description: 'Запуск первого космического туриста Денниса Тито на МКС'
            },
            {
                date: 2003,
                description: 'Первый полет частного космического корабля SpaceShipOne'
            },
            {
                date: 2004,
                description: 'Открытие планеты Седна в Солнечной системе'
            },
            {
                date: 2005,
                description: 'Клонирование первой собаки - афганской борзой по кличке Снуппи'
            }
        ]
    },
    {
        id: 5,
        title: 'Музыка',
        periodStart: 2005,
        periodEnd: 2010,
        details: [
            {
                date: 2005,
                description: 'Выход альбома "Confessions on a Dance Floor" Мадонны'
            },
            {
                date: 2007,
                description: 'Группа Radiohead выпускает альбом "In Rainbows" с системой "плати сколько хочешь"'
            },
            {
                date: 2008,
                description: 'Основание стримингового сервиса Spotify'
            },
            {
                date: 2009,
                description: 'Смерть Майкла Джексона, рост продаж его альбомов на 2000%'
            },
            {
                date: 2010,
                description: 'Выход дебютного альбома Леди Гаги "The Fame Monster"'
            }
        ]
    },
];

export default slides;