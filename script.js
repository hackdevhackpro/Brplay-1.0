document.addEventListener('DOMContentLoaded', function() {
    const canaisAbertosList = document.getElementById('canais-abertos');
    const filmesList = document.getElementById('filmes');
    const seriesList = document.getElementById('series');
    const infantilList = document.getElementById('infantil');
    const videoPlayer = document.getElementById('main-video');

    // Lista de canais de teste com categoria
    const testChannels = [
        { name: 'RECORD (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8', thumbnail: 'placeholder5.png', categoria: 'abertos' },
        { name: 'SBT (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8', thumbnail: 'placeholder4.png', categoria: 'abertos' },
    {name: 'BAND (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-15748/LVW15748_Yed7yzLuRC/chunklist.m3u8', thumbnail: 'placeholder6.png', categoria: 'abertos'},
        { name: 'HBO', url: 'https:///livst.site/hbo/index.m3u8', thumbnail: 'placeholder7.png', categoria: 'filmes' },
        { name: 'HBO2', url: 'https://playtvonline.com/hbo-family/', thumbnail: 'p....', categoria: 'filmes' },
        { name: 'TNT SERIE', url: 'https://test-streams.mux.dev/pts_mpeg/240p.m3u8', thumbnail: 'placeholder9.png', categoria: 'series' },
        { name: 'clasic tv series ', url: 'https://stmv1.srvif.com/tvserie/tvserie/playlist.m3u8', thumbnail: 'placeholder10.png', categoria: 'series' },
        { name: 'GOSPEL CARTOON', url: 'https://stmv1.srvif.com/gospelcartoon/gospelcartoon/playlist.m3u8', thumbnail: 'placeholder11.png', categoria: 'infantil' },
        { name: 'KIDS MAIS', url: 'https://video03.logicahost.com.br/novafamilia01/novafamilia01/playlist.m3u8', thumbnail: 'Placeholder12.webp', categoria: 'infantil' },
        // Adicione mais canais aqui com suas categorias e thumbnails correspondentes
    ];

    function loadVideo(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                videoPlayer.play();
            });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            videoPlayer.src = url;
            videoPlayer.addEventListener('loadedmetadata', function() {
                videoPlayer.play();
            });
        } else {
            alert('Este navegador não suporta a reprodução de vídeo HLS.');
        }
    }

    testChannels.forEach(channel => {
        const listItem = document.createElement('li');
        listItem.classList.add('channel-item');

        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('channel-thumbnail');
        thumbnailDiv.style.backgroundImage = `url('${channel.thumbnail}')`;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('channel-name');
        nameSpan.textContent = channel.name;

        listItem.appendChild(thumbnailDiv);
        listItem.appendChild(nameSpan);
        listItem.addEventListener('click', function() {
            loadVideo(channel.url);
        });

        switch (channel.categoria) {
            case 'abertos':
                canaisAbertosList.appendChild(listItem);
                break;
            case 'filmes':
                filmesList.appendChild(listItem);
                break;
            case 'series':
                seriesList.appendChild(listItem);
                break;
            case 'infantil':
                infantilList.appendChild(listItem);
                break;
        }
    });

    // Carregar o primeiro vídeo por padrão (opcional)
    if (testChannels.length > 0) {
        loadVideo(testChannels[0].url);
    }
});