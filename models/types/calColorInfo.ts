export const MonthColorNames = [
    { color: '#2F5C8F', title: 'January' },
    { color: '#C41E3A', title: 'February' },
    { color: '#3B7A57', title: 'March' },
    { color: '#E6B800', title: 'April' },
    { color: '#FF7B9C', title: 'May' },
    { color: '#4F86F7', title: 'June' },
    { color: '#DE3831', title: 'July' },
    { color: '#F28C28', title: 'August' },
    { color: '#B76E79', title: 'September' },
    { color: '#CF5300', title: 'October' },
    { color: '#8B4513', title: 'November' },
    { color: '#154734', title: 'December' },
];


export interface CalendarColors {
    monthColor: string;
    textOnMonth: string;
    regularDay: {
        background: string;
        text: string;
        border: string;
    };
    weekend: {
        background: string;
        text: string;
        border: string;
    };
    outsideMonth: {
        background: string;
        text: string;
        border: string;
        opacity: number;
    };
    outsideWeekend: {
        background: string;
        text: string;
        border: string;
        opacity: number;
    };
    today: {
        background: string;
        text: string;
        border: string;
        shadow: string;
    };
    todayWeekend: {
        background: string;
        text: string;
        border: string;
        shadow: string;
    };
    hover: {
        regular: string;
        weekend: string;
        outside: string;
        today: string;
    };
}

export const JanColors = {
    monthColor: '#2F5C8F',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#e8f0f7',
        text: '#000000',
        border: '#2F5C8F'
    },
    weekend: {
        background: '#d1e3f2',
        text: '#000000',
        border: '#2F5C8F'
    },
    outsideMonth: {
        background: '#f5f8fa',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#f5f8fa',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#2F5C8F',
        text: '#ffffff',
        border: '#9daec2ff',
        shadow: '0 0 6px rgba(47, 92, 143, 0.5)'
    },
    todayWeekend: {
        background: '#2F5C8F',
        text: '#ffffff',
        border: '#2F5C8F',
        shadow: '0 0 8px rgba(47, 92, 143, 0.6)'
    },
    hover: {
        regular: '#bdd6ea',
        weekend: '#a8cde3',
        outside: '#f0f4f7',
        today: '#2F5C8F'
    }
} as CalendarColors;

export const FebColors = {
    monthColor: '#C41E3A',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#fdedf0',
        text: '#000000',
        border: '#C41E3A'
    },
    weekend: {
        background: '#fbd5dc',
        text: '#000000',
        border: '#C41E3A'
    },
    outsideMonth: {
        background: '#fef7f8',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fef7f8',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#C41E3A',
        text: '#ffffff',
        border: '#c29ea4ff',
        shadow: '0 0 6px rgba(196, 30, 58, 0.5)'
    },
    todayWeekend: {
        background: '#C41E3A',
        text: '#ffffff',
        border: '#C41E3A',
        shadow: '0 0 8px rgba(196, 30, 58, 0.6)'
    },
    hover: {
        regular: '#f7bdc8',
        weekend: '#f3a4b5',
        outside: '#fcf2f3',
        today: '#C41E3A'
    }
} as CalendarColors;

export const MarColors = {
    monthColor: '#3B7A57',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#f0f7f3',
        text: '#000000',
        border: '#3B7A57'
    },
    weekend: {
        background: '#e0efe6',
        text: '#000000',
        border: '#3B7A57'
    },
    outsideMonth: {
        background: '#f8fbf9',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#f8fbf9',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#3B7A57',
        text: '#ffffff',
        border: '#abcab9ff',
        shadow: '0 0 6px rgba(59, 122, 87, 0.5)'
    },
    todayWeekend: {
        background: '#3B7A57',
        text: '#ffffff',
        border: '#3B7A57',
        shadow: '0 0 8px rgba(59, 122, 87, 0.6)'
    },
    hover: {
        regular: '#c8dfcf',
        weekend: '#b1d1bc',
        outside: '#f4f9f6',
        today: '#3B7A57'
    }
} as CalendarColors;

export const AprColors = {
    monthColor: '#E6B800',
    textOnMonth: '#000000',
    regularDay: {
        background: '#fef9e6',
        text: '#000000',
        border: '#E6B800'
    },
    weekend: {
        background: '#fdf2cc',
        text: '#000000',
        border: '#E6B800'
    },
    outsideMonth: {
        background: '#fffdf5',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fffdf5',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#E6B800',
        text: '#000000',
        border: '#d4d0bcff',
        shadow: '0 0 6px rgba(230, 184, 0, 0.5)'
    },
    todayWeekend: {
        background: '#E6B800',
        text: '#000000',
        border: '#E6B800',
        shadow: '0 0 8px rgba(230, 184, 0, 0.6)'
    },
    hover: {
        regular: '#fae8b3',
        weekend: '#f7e199',
        outside: '#fffef9',
        today: '#E6B800'
    }
} as CalendarColors;

export const MayColors = {
    monthColor: '#FF7B9C',
    textOnMonth: '#000000',
    regularDay: {
        background: '#fff2f5',
        text: '#000000',
        border: '#FF7B9C'
    },
    weekend: {
        background: '#ffe5eb',
        text: '#000000',
        border: '#FF7B9C'
    },
    outsideMonth: {
        background: '#fffafc',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fffafc',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#FF7B9C',
        text: '#000000',
        border: '#7a2f41ff',
        shadow: '0 0 6px rgba(255, 123, 156, 0.5)'
    },
    todayWeekend: {
        background: '#FF7B9C',
        text: '#000000',
        border: '#FF7B9C',
        shadow: '0 0 8px rgba(255, 123, 156, 0.6)'
    },
    hover: {
        regular: '#ffc8d6',
        weekend: '#ffb4c8',
        outside: '#fff7f9',
        today: '#FF7B9C'
    }
} as CalendarColors;

export const JunColors = {
    monthColor: '#4F86F7',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#f0f4ff',
        text: '#000000',
        border: '#4F86F7'
    },
    weekend: {
        background: '#e1eaff',
        text: '#000000',
        border: '#4F86F7'
    },
    outsideMonth: {
        background: '#f8faff',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#f8faff',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#4F86F7',
        text: '#ffffff',
        border: '#47536bff',
        shadow: '0 0 6px rgba(79, 134, 247, 0.5)'
    },
    todayWeekend: {
        background: '#4F86F7',
        text: '#ffffff',
        border: '#4F86F7',
        shadow: '0 0 8px rgba(79, 134, 247, 0.6)'
    },
    hover: {
        regular: '#c7d9fe',
        weekend: '#b3cffe',
        outside: '#f4f7ff',
        today: '#4F86F7'
    }
} as CalendarColors;

export const JulColors = {
    monthColor: '#DE3831',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#fef0ef',
        text: '#000000',
        border: '#DE3831'
    },
    weekend: {
        background: '#fde0de',
        text: '#000000',
        border: '#DE3831'
    },
    outsideMonth: {
        background: '#fff8f7',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fff8f7',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#DE3831',
        text: '#ffffff',
        border: '#6e1e1bff',
        shadow: '0 0 6px rgba(222, 56, 49, 0.5)'
    },
    todayWeekend: {
        background: '#DE3831',
        text: '#ffffff',
        border: '#DE3831',
        shadow: '0 0 8px rgba(222, 56, 49, 0.6)'
    },
    hover: {
        regular: '#fac1bd',
        weekend: '#f7a8a3',
        outside: '#fcf3f2',
        today: '#DE3831'
    }
} as CalendarColors;

export const AugColors = {
    monthColor: '#F28C28',
    textOnMonth: '#000000',
    regularDay: {
        background: '#fef5ec',
        text: '#000000',
        border: '#F28C28'
    },
    weekend: {
        background: '#fdebd8',
        text: '#000000',
        border: '#F28C28'
    },
    outsideMonth: {
        background: '#fffaf6',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fffaf6',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#F28C28',
        text: '#000000',
        border: '#663b10ff',
        shadow: '0 0 6px rgba(242, 140, 40, 0.5)'
    },
    todayWeekend: {
        background: '#F28C28',
        text: '#000000',
        border: '#F28C28',
        shadow: '0 0 8px rgba(242, 140, 40, 0.6)'
    },
    hover: {
        regular: '#f9d7b3',
        weekend: '#f7cc9e',
        outside: '#fef7f0',
        today: '#F28C28'
    }
} as CalendarColors;

export const SepColors = {
    monthColor: '#B76E79',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#f7f2f3',
        text: '#000000',
        border: '#B76E79'
    },
    weekend: {
        background: '#f0e5e7',
        text: '#000000',
        border: '#B76E79'
    },
    outsideMonth: {
        background: '#faf8f9',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#faf8f9',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#B76E79',
        text: '#ffffff',
        border: '#70222eff',
        shadow: '0 0 6px rgba(183, 110, 121, 0.5)'
    },
    todayWeekend: {
        background: '#B76E79',
        text: '#ffffff',
        border: '#B76E79',
        shadow: '0 0 8px rgba(183, 110, 121, 0.6)'
    },
    hover: {
        regular: '#dcc8cd',
        weekend: '#d0b7be',
        outside: '#f5f0f1',
        today: '#B76E79'
    }
} as CalendarColors;

export const OctColors = {
    monthColor: '#CF5300',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#fef3ec',
        text: '#000000',
        border: '#CF5300'
    },
    weekend: {
        background: '#fde7d8',
        text: '#000000',
        border: '#CF5300'
    },
    outsideMonth: {
        background: '#fff9f6',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#fff9f6',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#ff8738ff',
        text: '#ffffff',
        border: '#c2a1a1ff',
        shadow: '0 0 6px rgba(207, 83, 0, 0.5)'
    },
    todayWeekend: {
        background: '#CF5300',
        text: '#ffffff',
        border: '#CF5300',
        shadow: '0 0 8px rgba(207, 83, 0, 0.6)'
    },
    hover: {
        regular: '#f7d3b3',
        weekend: '#f4c599',
        outside: '#fcf5f0',
        today: '#CF5300'
    }
} as CalendarColors;

export const NovColors = {
    monthColor: '#8B4513',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#f5f2ef',
        text: '#000000',
        border: '#8B4513'
    },
    weekend: {
        background: '#ebe5de',
        text: '#000000',
        border: '#8B4513'
    },
    outsideMonth: {
        background: '#f9f7f5',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#f9f7f5',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#8B4513',
        text: '#ffffff',
        border: '#b89882ff',
        shadow: '0 0 6px rgba(139, 69, 19, 0.5)'
    },
    todayWeekend: {
        background: '#8B4513',
        text: '#ffffff',
        border: '#8B4513',
        shadow: '0 0 8px rgba(139, 69, 19, 0.6)'
    },
    hover: {
        regular: '#d1c2b8',
        weekend: '#c4b0a1',
        outside: '#f2ede8',
        today: '#8B4513'
    }
} as CalendarColors;

export const DecColors = {
    monthColor: '#154734',
    textOnMonth: '#ffffff',
    regularDay: {
        background: '#eef6f2',
        text: '#000000',
        border: '#154734'
    },
    weekend: {
        background: '#ddeee4',
        text: '#000000',
        border: '#154734'
    },
    outsideMonth: {
        background: '#f7faf8',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    outsideWeekend: {
        background: '#f7faf8',
        text: '#6b7280',
        border: '#9ca3af',
        opacity: 0.6
    },
    today: {
        background: '#154734',
        text: '#ffffff',
        border: '#489276ff',
        shadow: '0 0 6px rgba(21, 71, 52, 0.5)'
    },
    todayWeekend: {
        background: '#154734',
        text: '#ffffff',
        border: '#154734',
        shadow: '0 0 8px rgba(21, 71, 52, 0.6)'
    },
    hover: {
        regular: '#bdd9c9',
        weekend: '#a6cdb7',
        outside: '#f3f8f5',
        today: '#154734'
    }
} as CalendarColors;
