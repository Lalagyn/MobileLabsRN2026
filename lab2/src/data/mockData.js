export const newsData = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    title: `Новина №${i + 1}`,
    description: `Опис новини номер ${i + 1}. Тут міститься корисна інформація.`,
    image: `https://picsum.photos/seed/${i + 1}/400/200`,
    date: `${(i % 28) + 1}.04.2026`,
}));

export const contactsData = [
    {
        title: 'Викладачі',
        data: [
            { id: '1', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
            { id: '2', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
        ],
    },
    {
        title: 'Одногрупники',
        data: [
            { id: '3', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
            { id: '4', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
            { id: '5', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
        ],
    },
];