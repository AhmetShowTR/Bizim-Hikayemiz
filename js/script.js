const PASSWORD = "AAG";

/* GİRİŞ */
function checkPassword() {
  if (password.value === PASSWORD) {
    login.classList.add("hidden");
    letter.classList.remove("hidden");
    music.play();
    startConfetti();
    typeLetter();
  } else {
    error.innerText = "Şifre yanlış ama olsun… Kalbime biraz daha yaklaştın 💙";
  }
}

/* MEKTUP */
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
    letterText.innerHTML += letterContent.charAt(index);
    index++;
    setTimeout(typeLetter, 35);
  } else {
    afterLetter.classList.remove("hidden");
  }
}

function closeLetter() {
  letter.classList.add("hidden");
  gallery.classList.remove("hidden"); // Galeriyi sadece şifre doğru girildikten sonra göster
}

/* GALERİ */
function openLightbox(img) {
  lightbox.classList.remove("hidden");
  document.getElementById("lightbox-img").src = img.src;
}
function closeLightbox() {
  lightbox.classList.add("hidden");
}

/* KAYDIRINCA ANİMASYON */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>e.isIntersecting && e.target.classList.add("show"));
},{threshold:0.2});

setTimeout(()=>{
  document.querySelectorAll(".grid img").forEach(img=>observer.observe(img));
},500);

/* 🎉 KALP KONFETİ */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let hearts=[];

function startConfetti(){
  hearts=[];
  for(let i=0;i<80;i++){
    hearts.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height-canvas.height,
      s:Math.random()*12+8,
      v:Math.random()*3+2
    });
  }
  animate();
}

function drawHeart(x,y,s){
  ctx.fillStyle="#fff";
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.bezierCurveTo(x-s,y-s,x-1.5*s,y+s/2,x,y+s);
  ctx.bezierCurveTo(x+1.5*s,y+s/2,x+s,y-s,x,y);
  ctx.fill();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>{
    drawHeart(h.x,h.y,h.s);
    h.y+=h.v;
  });
  requestAnimationFrame(animate);
}
