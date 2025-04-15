document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('main-video');
    const prevButton = document.getElementById('prev-channel');
    const nextButton = document.getElementById('next-channel');
    const urlParams = new URLSearchParams(window.location.search);
    const currentVideoUrl = urlParams.get('url');
    const currentVideoName = urlParams.get('name');
    const currentVideoCategory = urlParams.get('category'); // Vamos passar a categoria também
    const videoPlayerSection = document.getElementById('video-player');
    const titleElement = videoPlayerSection.querySelector('h2');

    let channelsInCategory = [];
    let currentChannelIndex = -1;

    // Obter a lista de canais da mesma categoria (isso precisaria ser sincronizado com a lista principal)
    // Por simplicidade, vamos usar a mesma lista 'testChannels' definida no index.js
    const testChannels = [
        { name: 'RECORD (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8', thumbnail: 'placeholder5.png', categoria: 'abertos' },
        { name: 'SBT (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8', thumbnail: 'placeholder4.png', categoria: 'abertos' },
        {name: 'BAND (Aberto)', url: 'https://cdn.live.br1.jmvstream.com/w/LVW-15748/LVW15748_Yed7yzLuRC/chunklist.m3u8', thumbnail: 'placeholder6.png', categoria: 'abertos'},
        { name: 'HBO', url: 'https:///livst.site/hbo/index.m3u8', thumbnail: 'placeholder7.png', categoria: 'filmes' },
        { name: 'HBO2', url: 'https://playtvonline.com/hbo-family/', thumbnail: 'placeholder8.png', categoria: 'filmes' },
        { name: 'TNT SERIE', url: 'https://test-streams.mux.dev/pts_mpeg/240p.m3u8', thumbnail: 'placeholder9.png', categoria: 'series' },
        { name: 'clasic tv series ', url: 'https://stmv1.srvif.com/tvserie/tvserie/playlist.m3u8', thumbnail: 'placeholder10.png', categoria: 'series' },
        { name: 'GOSPEL CARTOON', url: 'https://stmv1.srvif.com/gospelcartoon/gospelcartoon/playlist.m3u8', thumbnail: 'placeholder11.png', categoria: 'infantil' },
        { name: 'KIDS MAIS', url: 'https://video03.logicahost.com.br/novafamilia01/novafamilia01/playlist.m3u8', thumbnail: 'Placeholder12.webp', categoria: 'infantil' }
        // Adicione mais canais aqui com suas categorias
    ];

    // Filtrar canais pela categoria atual
    channelsInCategory = testChannels.filter(channel => channel.categoria === currentVideoCategory);

    // Encontrar o índice do canal atual
    if (currentVideoUrl) {
        currentChannelIndex = channelsInCategory.findIndex(channel => channel.url === currentVideoUrl);
    }

    function loadVideo(url, name) {
        titleElement.textContent = name;
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

    prevButton.addEventListener('click', function() {
        if (channelsInCategory.length > 0 && currentChannelIndex > 0) {
            currentChannelIndex--;
            const prevChannel = channelsInCategory[currentChannelIndex];
            loadVideo(prevChannel.url, prevChannel.name);
            // Atualizar a URL da página para refletir o novo canal (opcional)
            history.pushState(null, prevChannel.name, `player.html?url=${encodeURIComponent(prevChannel.url)}&name=${encodeURIComponent(prevChannel.name)}&category=${encodeURIComponent(prevChannel.categoria)}`);
        }
    });

    nextButton.addEventListener('click', function() {
        if (channelsInCategory.length > 0 && currentChannelIndex < channelsInCategory.length - 1) {
            currentChannelIndex++;
            const nextChannel = channelsInCategory[currentChannelIndex];
            loadVideo(nextChannel.url, nextChannel.name);
            // Atualizar a URL da página para refletir o novo canal (opcional)
            history.pushState(null, nextChannel.name, `player.html?url=${encodeURIComponent(nextChannel.url)}&name=${encodeURIComponent(nextChannel.name)}&category=${encodeURIComponent(nextChannel.categoria)}`);
        }
    });

    // Carregar o vídeo inicial
    if (currentVideoUrl && currentVideoName) {
        loadVideo(currentVideoUrl, currentVideoName);
    } else {
        alert('URL do vídeo ou nome não encontrado.');
    }

    // Desabilitar botões se não houver canais ou se estiver no primeiro/último canal
    function updateButtonStates() {
        prevButton.disabled = !(channelsInCategory.length > 0 && currentChannelIndex > 0);
        nextButton.disabled = !(channelsInCategory.length > 0 && currentChannelIndex < channelsInCategory.length - 1);
    }

    updateButtonStates();
});