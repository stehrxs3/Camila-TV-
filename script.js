const listaDeVideos = [
    {
        id: 1,
        titulo: "Rock in Rio 2022",
        categoria: "Shows",
        capa: "https://via.placeholder.com/300x450/1d2671/ffffff?text=Rock+in+Rio",
        banner: "https://via.placeholder.com/1200x600/1d2671/ffffff?text=Rock+in+Rio+2022",
        descricao: "Assista ao show completo com as melhores faixas apresentadas ao vivo.",
        driveUrl: "https://drive.google.com/file/d/1JWNVyIacFmMOfSZ_cUZQIndM4QgSLbxl/preview",
        destaque: true
    }
];

let videoDestaqueAtual = null;

document.addEventListener("DOMContentLoaded", () => {
    configurarDestaque();
    carregarVideos(listaDeVideos);
});

function converterParaEmbedDrive(url) {
    if (!url) return "";
    return url.replace(/\/view(\?.*)?$/, "/preview");
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

    if (videos.length === 0) {
        videoGrid.innerHTML = "<p style='color: #888;'>Nenhum vídeo encontrado.</p>";
        return;
    }

    videos.forEach((video) => {
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
        const filtrados = listaDeVideos.filter(v => v.categoria.toLowerCase() === cat.toLowerCase());
        carregarVideos(filtrados);
    }
}

function filtrarPorBusca() {
    const termo = document.getElementById("searchInput").value.toLowerCase();
    const filtrados = listaDeVideos.filter(v =>
        v.titulo.toLowerCase().includes(termo) ||
        v.categoria.toLowerCase().includes(termo)
    );
    carregarVideos(filtrados);
}

function abrirVideo(video) {
    const modal = document.getElementById("videoModal");
    const player = document.getElementById("videoPlayer");
    const title = document.getElementById("modalVideoTitle");

    title.innerText = video.titulo;
    player.src = converterParaEmbedDrive(video.driveUrl);
    modal.style.display = "flex";
}

function playHeroVideo() {
    if (videoDestaqueAtual) {
        abrirVideo(videoDestaqueAtual);
    }
}

function formatarUrlDrive(url) {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
        return url.replace(/\/view(\?.*)?$/, "/preview").replace(/\/edit(\?.*)?$/, "/preview");
    }
    return url;
}

function fecharVideo() {
    const modal = document.getElementById("videoModal");
    const player = document.getElementById("videoPlayer");
    player.src = "";
    modal.style.display = "none";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharVideo();
});