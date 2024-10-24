export const convertTo12HourFormat = (time: string) => {
    if(time.length === 0) return 'CLOSED';
    const [hour, minute] = time.split(':');
    let hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    hourNum = hourNum % 12 || 12; // Convert 0 to 12 for midnight
    return `${hourNum}:${minute} ${ampm}`;
};