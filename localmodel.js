function setBoot(pct, label) {
  const bar = document.getElementById("boot-bar");
  const num = document.getElementById("boot-pct");
  const lab = document.getElementById("boot-label");
  if (bar) bar.style.width = Math.max(0, Math.min(100, pct)) + "%";
  if (num) num.textContent = Math.round(pct) + "%";
  if (lab) lab.textContent = label;
}
async function bootModel() {
  setBoot(4, "連接模型檔");
  try {
    const res = await fetch("models/model_q4.onnx");
    if (!res.ok || !res.body) throw new Error("model missing");
    const total = Number(res.headers.get("content-length")) || 0;
    const reader = res.body.getReader();
    let got = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      got += value.length;
      const pct = total ? (got / total) * 90 : 40;
      setBoot(pct, "載入權重 " + Math.round(got / 1048576) + "MB");
    }
    setBoot(94, "模型已落到瀏覽器");
  } catch (e) {
    setBoot(100, "模型檔未連上，先用頁面");
  }
  setTimeout(() => document.getElementById("boot").classList.add("hide"), 600);
}
window.setBoot = setBoot;
bootModel();
