const thumbnails = [
    'https://images.unsplash.com/photo-1670324382035-f9cfacc3b59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU3OTA5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1517328894681-0f5dfabd463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5pZ2h0fGVufDF8fHx8MTc2NTc3OTY2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1550275994-cdc89cd1948f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzfGVufDF8fHx8MTc2NTc5ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1553614186-d23d17be2ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2NTc5ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1562114565-9ad7a313d0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHRsaWZlfGVufDF8fHx8MTc2NTc5MTg0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NzIzNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];
  
  const titles = [
    'MIDNIGHT DESIRES IN THE CITY',
    'ELECTRIC NIGHTS - PREMIUM HD',
    'URBAN FANTASY COLLECTION',
    'NEON DREAMS AFTER DARK',
    'DOWNTOWN PASSION SERIES',
    'CINEMATIC ENCOUNTERS VOL.1',
    'NIGHT SHIFT - EXCLUSIVE',
    'CITY LIGHTS & LATE NIGHTS',
    'PREMIUM NOIR COLLECTION',
    'AFTER HOURS CHRONICLES',
    'METROPOLITAN HEAT',
    'GRAND STYLE EXCLUSIVE',
    'DARK DESIRE DOCUMENTARY',
    'URBAN LEGENDS SERIES',
    'ELECTRIC PULSE HD',
    'CINEMATIC PASSION FILMS',
    'LATE NIGHT CONFESSIONS',
    'CITY STREETS AFTER MIDNIGHT',
    'NEON NOIR COLLECTION',
    'DOWNTOWN AFTER DARK',
    'PREMIUM NIGHT SERIES',
    'URBAN TEMPTATION FILES',
    'MIDNIGHT CINEMA SPECIAL',
    'GRAND STYLE ORIGINALS',
  ];
  
  const categories = [
    'PREMIUM',
    'TRENDING',
    'EXCLUSIVE',
    'HD QUALITY',
    'NEW RELEASE',
    'POPULAR',
    "EDITOR'S PICK",
    'FEATURED',
  ];
  
  const durations = ['12:34', '18:45', '23:12', '15:30', '20:15', '25:40', '16:22', '21:55'];
  const viewCounts = ['1.2M', '850K', '2.4M', '650K', '3.1M', '920K', '1.8M', '740K'];
  const uploadTimes = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago', '2 weeks ago', '1 month ago'];
  
  export const mockVideos = Array.from({ length: 24 }, (_, i) => ({
    id: `video-${i + 1}`,
    thumbnail: thumbnails[i % thumbnails.length],
    title: titles[i % titles.length],
    duration: durations[i % durations.length],
    views: viewCounts[i % viewCounts.length],
    uploadTime: uploadTimes[i % uploadTimes.length],
    category: categories[i % categories.length],
  }));
  