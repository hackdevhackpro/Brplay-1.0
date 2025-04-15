document.addEventListener('DOMContentLoaded', function () {
  const categorias = {
    abertos: document.getElementById('canais-abertos'),
    filmes: document.getElementById('filmes'),
    series: document.getElementById('series'),
    infantil: document.getElementById('infantil')
  };

  const testChannels = [
    { name: 'RECORD (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8', thumbnail: 'placeholder5.png', categoria: 'abertos' },
    { name: 'SBT (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8', thumbnail: 'placeholder4.png', categoria: 'abertos' },
    { name: 'BAND (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-15748/LVW15748_Yed7yzLuRC/chunklist.m3u8', thumbnail: 'placeholder6.png', categoria: 'abertos' },
    { name: 'HBO', url: 'https://livst.site/hbo/index.m3u8', thumbnail: 'placeholder7.png', categoria: 'filmes' },
    { name: 'HBO2', url: 'https://playtvonline.com/hbo-family/', thumbnail: 'placeholder8.png', categoria: 'filmes' },
    { name: 'TNT SERIE', url: 'https://test-streams.mux.dev/pts_mpeg/240p.m3u8', thumbnail: 'placeholder9.png', categoria: 'series' },
    { name: 'Classic TV Series', url: 'https://stmv1.srvif.com/tvserie/tvserie/playlist.m3u8', thumbnail: 'placeholder10.png', categoria: 'series' },
    { name: 'GOSPEL CARTOON', url: 'https://stmv1.srvif.com/gospelcartoon/gospelcartoon/playlist.m3u8', thumbnail: 'placeholder11.png', categoria: 'infantil' },
    { name: 'KIDS MAIS', url: 'https://video03.logicahost.com.br/novafamilia01/novafamilia01/playlist.m3u8', thumbnail: 'Placeholder12.webp', categoria: 'infantil' }
  ];

  testChannels.forEach(channel => {
    const container = categorias[channel.categoria];
    if (!container) return;

    const item = document.createElement('div');
    item.classList.add('channel-item');

    item.innerHTML = `
      <a href="player.html?url=${encodeURIComponent(channel.url)}&name=${encodeURIComponent(channel.name)}&category=${encodeURIComponent(channel.categoria)}" style="text-decoration: none;">
        <div class="channel-thumbnail" style="background-image: url('${channel.thumbnail}')"></div>
        <div class="channel-name">${channel.name}</div>
      </a>
    `;

    container.appendChild(item);
  });
});
