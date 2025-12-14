const PASSWORD = "AAG";

// Şifreyi kontrol et
function checkPassword() {
  const passwordField = document.getElementById("password");
  const error = document.getElementById("error");

  // Şifre doğruysa
  if (passwordField.value === PASSWORD) {
    // Giriş ekranını gizle
    document.getElementById("login").classList.add("hidden");

    // Mektup ekranını göster
    document.getElementById("letter").classList.remove("hidden");

    // Müzik çalmaya başla
    const music = document.getElementById("music");
    music.play();

    // Konfeti başlat
    startConfetti();

    // Mektup yazısını başlat
    typeLetter();
  } else {
    // Hata mesajı göster
    error.innerText = "Şifre yanlış ama olsun… Kalbime biraz daha yaklaştın 💙";
  }
}

// Mektup yazısı
const letterContent = `Aramızda tam 875 kilometre var…
Ama kalbimde sana olan mesafe hiç değişmiyor.

Aynı gökyüzüne bakıyoruz,
aynı yıldızları sayıyoruz.

Gün gelecek bu yollar bitecek.
O zamana kadar seni sabırla,
sevgiyle bekliyorum.

İyi ki varsın.
İyi ki biziz.`;

let index = 0;
function typeLetter() {
  if (index < letterContent.length) {
    document.getElementById("letterText").innerHTML += letterContent.charAt(index);
    index++;
    setTimeout(typeLetter, 35); // Harfler yazılmaya devam eder
  } else {
    // Mektup bitince kalp animasyonunu başlat
    document.getElementById("afterLetter").classList.remove("hidden");
    setTimeout(() => {
      // Mektup bittiğinde 2 saniye sonra fotoğraf albümüne geçiş yap
      closeLetter();
    }, 2000); // Geçiş için 2 saniye bekleyelim
  }
}

function closeLetter() {
  // Mektubu kapat
  document.getElementById("letter").classList.add("hidden");

  // Fotoğraf albümünü göster
  const gallery = document.getElementById("gallery");
  gallery.classList.remove("hidden");

  loadGallery(); // Fotoğrafları yükle
}

// Fotoğraf galerisini yükle
function loadGallery() {
  const gallery = document.getElementById("gallery").getElementsByClassName("grid")[0];
  for (let i = 1; i <= 19; i++) {
    const img = document.createElement("img");
    img.src = `images/photo${i}.jpg`;
    img.onclick = () => openLightbox(img);
    gallery.appendChild(img);
  }
}

function openLightbox(img) {
  document.getElementById("lightbox").classList.remove("hidden");
  document.getElementById("lightbox-img").src = img.src;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

// Konfeti efekti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function startConfetti() {
  hearts = [];
  for (let i = 0; i < 80; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 3 + 2
    });
  }
  animateConfetti();
}

function drawHeart(x, y, size) {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - 1.5 * size, y + size / 2, x, y + size);
  ctx.bezierCurveTo(x + 1.5 * size, y + size / 2, x + size, y - size, x, y);
  ctx.fill();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    drawHeart(h.x, h.y, h.size);
    h.y += h.speed;
  });
  requestAnimationFrame(animateConfetti);
}
