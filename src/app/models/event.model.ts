export interface Speaker {
    name: string;
    title: string;
    company: string;
    bio: string;
    avatar?: string;
}

export interface ScheduleItem {
    time: string;
    title: string;
    speaker?: string;
    room?: string;
    type: 'keynote' | 'talk' | 'workshop' | 'break' | 'networking';
}

export interface Event {
    id: string;
    name: string;
    category: string;
    date: string;
    endDate?: string;
    location: string;
    venue?: string;
    description: string;
    longDescription?: string;
    price: number;
    capacity: number;
    attendees: number;
    tags: string[];
    isFeatured: boolean;
    isSoldOut: boolean;
    imageUrl?: string;
    speakers: Speaker[];
    schedule: ScheduleItem[];
    organizerName?: string;
    organizerEmail?: string;
}

export type EventCategory = 'All' | 'Technology' | 'Music' | 'Art' | 'Business' | 'Sports' | 'Health';
