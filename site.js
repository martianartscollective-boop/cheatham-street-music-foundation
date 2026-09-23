// Shared helpers used by every page. Kept tiny and dependency-free.
function esc(s){ return (s === null || s === undefined) ? '' : String(s); }

function markActiveNav(){
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('.navlinks a').forEach(a => {
    if(a.getAttribute('data-page') === page) a.classList.add('active');
  });
}

async function loadContent(path, renderFn, fallback){
  markActiveNav();
  if(fallback) renderFn(fallback); // paint instantly with embedded defaults
  try{
    const res = await fetch(path + '?_=' + Date.now());
    if(res.ok){
      const data = await res.json();
      renderFn(data);
    }
  }catch(e){ /* offline/local preview — fallback content already shown */ }
}

function renderHero(data){
  const el = document.getElementById('pageHero');
  if(!el || !data.hero) return;
  el.innerHTML = `
    <div class="bulbs">${'<span></span>'.repeat(14)}</div>
    <span class="kicker marquee-font">${esc(data.hero.kicker)}</span>
    <h1 class="display">${esc(data.hero.title)}</h1>
    <p class="lede" style="margin:14px auto 0;color:var(--paper-2);">${esc(data.hero.lede)}</p>
  `;
}
