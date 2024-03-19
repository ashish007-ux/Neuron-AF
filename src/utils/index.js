export function filterDataByChannelId(data, channelId) {
    return data.filter(obj => obj.channel_id === channelId);
}

