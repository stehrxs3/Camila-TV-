


// Configuração da URL da sua transmissão ao vivo (Ex: YouTube Live, Twitch ou HLS)
const urlTransmissaoAoVivo = "https://www.youtube.com/embed/jkfpyJRk?autoplay=1";

const listaDeVideos = [
    {
        id: 1,
        titulo: "Rock in Rio 2022",
        categoria: "Shows",
        capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
        banner: "https://media.gettyimages.com/id/1422667658/pt/foto/rio-de-janeiro-brazil-camila-cabello-performs-at-the-mundo-stage-during-the-rock-in-rio.jpg?s=612x612&w=0&k=20&c=Q5pZ2vHYsdYBIDJMg43v2xm-dKbMFuhsnsR1zfIQKTE=",
        descricao: "Assista aos melhores momentos das performances no festival Rock in Rio.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        destaque: false
     },
    {
        id: 2,
        titulo: "Summer Sonic 2025",
        categoria: "Shows",
        capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
        banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
        descricao: "Assista aos melhores momentos das performances no festival Rock in Rio.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        destaque: false
    },
    {
        id: 3,
        titulo: "The Town 2025",
        categoria: "Shows",
        capa:"https://media.gettyimages.com/id/2296266737/pt/foto/los-angeles-california-camila-cabello-attends-the-lucas-museum-of-narrative-art-opening-night.jpg?s=612x612&w=0&k=20&c=TaZPAs8xMY2W23eaBfMIZoY5YR3409bFquBzw3u_42A=",
        banner: "https://rollingstone.com.br/wp-content/uploads/2025/09/Camila-Cabello-The-Town-2025-foto-Ellen-Artie-02-1536x1024.jpg",
        descricao: "Assista ao show completo do festival The Town 2025.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        destaque: true
     },
     {
        id: 4,
        titulo: "Bastidores & Entrevista Exclusiva",
        categoria: "Entrevistas",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80",
        banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
        descricao: "Conversa aberta sobre carreira, projetos futuros e criação artística.",
        videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1",
        destaque: false
     },
     {
        id: 5,
        titulo: "Vlog de Turnê pela Europa",
        categoria: "Vlogs",
        capa: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&q=80",
        banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
        descricao: "Acompanhe o dia a dia na estrada durante a turnê internacional.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        destaque: false
     },
];

let videoDestaqueAtual = null;

document.addEventListener("DOMContentLoaded", () => {
    configurarDestaque();
    carregarVideos(listaDeVideos);
});

function converterParaEmbedDrive(url) {
    if (!url) return "";
    return url.replace(/\/view(\?.*)?$/, "/preview").replace(/\/edit(\?.*)?$/, "/preview");
}

function configurarDestaque() {
    const destaque = listaDeVideos.find(v => v.destaque) || listaDeVideos[0];
    if (!destaque) return;

    videoDestaqueAtual = destaque;
    const heroBanner = document.getElementById("heroBanner");

    if (destaque.banner) {
        heroBanner.style.backgroundImage = `linear-gradient(to right, rgba(20,20,20,0.9), rgba(20,20,20,0.2)), url('${destaque.banner}')`;
    }

    document.getElementById("heroTitle").innerText = destaque.titulo || "Sem título";
    document.getElementById("heroDesc").innerText = destaque.descricao || "";
    document.getElementById("heroBadge").innerText = destaque.categoria || "Destaque";
}

function carregarVideos(videos) {
    const videoGrid = document.getElementById("videoGrid");
    videoGrid.innerHTML = "";

    // Filtra itens inválidos antes de desenhar na tela
    const videosValidos = videos.filter(v => v && v.titulo);

    if (videosValidos.length === 0) {
        videoGrid.innerHTML = "<p style='color: #888;'>Nenhum vídeo encontrado.</p>";
        return;
    }

    videosValidos.forEach((video) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.onclick = () => abrirVideo(video);

        const imagemCapa = video.capa || "https://via.placeholder.com/300x450/222/fff?text=Sem+Capa";

        card.innerHTML = `
            <img src="${imagemCapa}" alt="${video.titulo}">
            <div class="card-info">
                <div class="card-title">${video.titulo}</div>
                <div class="card-category">${video.categoria}</div>
            </div>
        `;

        videoGrid.appendChild(card);
    });
}

function filtrarCategoria(cat, btn) {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const title = document.getElementById("sectionTitle");
    title.innerText = cat === "todos" ? "Todos os Conteúdos" : cat;

    if (cat === "todos") {
        carregarVideos(listaDeVideos);
    } else {
        const filtrados = listaDeVideos.filter(v => 
            v && v.categoria && v.categoria.trim().toLowerCase() === cat.trim().toLowerCase()
        );
        carregarVideos(filtrados);
    }
}

function filtrarPorBusca() {
    const termo = document.getElementById("searchInput").value.trim().toLowerCase();
    const filtrados = listaDeVideos.filter(v =>
        v && v.titulo && (
            v.titulo.toLowerCase().includes(termo) ||
            (v.categoria && v.categoria.toLowerCase().includes(termo))
        )
    );
    carregarVideos(filtrados);
}

function abrirVideo(video) {
    const modal = document.getElementById("videoModal");
    const player = document.getElementById("videoPlayer");
    const title = document.getElementById("modalVideoTitle");

    title.innerText = video.titulo;
    container.innerHTML = "";

  let url = video.videoUrl || "";

  if (url.includes("drive.google.com")) {
    url = converterParaEmbedDrive(url)
  }

  if (url.endsWith(".mp4") || url.endsWith(".webm")) {
     container.innerHTML = '<video src="${url}" controls autoplay allowfullscreen></video>';
     } else {
        container.innerHTML = '<iframe src ="${url}" allow="autoplay; fullscreen" allowfullscreen></iframe>';
     }

     modal.style.display = "flex";
}

function playHeroVideo() {
    if (videoDestaqueAtual) {
        abrirVideo(videoDestaqueAtual);
    }
}

function fecharVideo() {
    const modal = document.getElementById("videoModal");
    const player = document.getElementById("videoPlayer");
   container.innerHTML = "";
    modal.style.display = "none";
}

/* Funções para a Transmissão Ao Vivo */
function abrirTransmissaoAoVivo() {
    const liveModal = document.getElementById("liveModal");
    const livePlayer = document.getElementById("livePlayer");
    livePlayer.src = urlTransmissaoAoVivo;
    liveModal.style.display = "flex";
}

function fecharLive() {
    const liveModal = document.getElementById("liveModal");
    const livePlayer = document.getElementById("livePlayer");
    livePlayer.src = "";
    liveModal.style.display = "none";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharVideo();
        fecharLive();
    }
});