// ==========================================================================
// 1. 作品詳細データ（コンセプト・設計書・技術構成）
// ==========================================================================
const worksData = {
    "work-01": {
        title: "EC BRANDING SITE",
        category: "WEB DESIGN / FRONT-END",
        concept: "ターゲット層（20〜30代女性）に合わせた高級感のあるUI/UXを設計。購買率（CVR）向上を目指した動線設計と、ブランドの世界観を伝えるスクロールエフェクトを構築。",
        spec: "【ターゲット】20〜30代女性\n【制作期間】3週間\n【担当範囲】デザインカンプ作成、ワイヤーフレーム設計、コーディング（レスポンシブ対応）",
        tech: ["HTML5", "CSS3 / SASS", "JavaScript", "GSAP", "Figma"],
        images: ["images/photo01.jpg"],
        url: "https://example.com"
    },
    "work-02": {
        title: "BRAND LOOKBOOK",
        category: "GRAPHIC / EDITORIAL DESIGN",
        concept: "アパレルブランドの2026 AWコレクション用冊子デザイン。余白を大きく活かしたレイアウトと、用紙の質感（ヴァンヌーボ）を指定することで高級感を演出。",
        spec: "【仕様】A4判 / 24ページ / フルカラー\n【使用ツール】InDesign, Illustrator, Photoshop\n【役割】企画構成、グリッドレイアウト設計、入稿データ作成",
        tech: ["Adobe InDesign", "Illustrator", "Photoshop"],
        images: ["images/photo02.jpg"],
        url: null
    },
    "work-03": {
        title: "TECH STARTUP LOGO",
        category: "LOGO & BRANDING",
        concept: "次世代AIスタートアップのコーポレートロゴ。「先進性」と「信頼感」をシンボライズするため、幾何学的なグリッドシステムに基づいて黄金比でシンボルマークを構築。",
        spec: "【成果物】ロゴマーク、ロゴマニュアル（ガイドライン）、名刺・封筒デザイン\n【設計書】アイソレーションゾーン設定、カラーパレット（RGB/CMYK/PANTONE）定義",
        tech: ["Illustrator", "Branding Guideline"],
        images: ["images/photo03.jpg"],
        url: null
    }
};

// ==========================================================================
// 2. カテゴリフィルタリング機能
// ==========================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        workCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    });
});

// ==========================================================================
// 3. 全画面詳細ページ（モーダル）表示制御
// ==========================================================================
const modal = document.getElementById('work-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const homeBtn = document.getElementById('home-btn');

workCards.forEach(card => {
    card.addEventListener('click', () => {
        const workId = card.getAttribute('data-work-id');
        const data = worksData[workId];

        if (!data) return;

        modalBody.innerHTML = `
            <div class="modal-header">
                <span class="modal-category">${data.category}</span>
                <h2 class="modal-title">${data.title}</h2>
            </div>
            <div class="modal-grid">
                <div class="modal-info">
                    <h3 class="modal-section-title">CONCEPT & STRATEGY</h3>
                    <p class="modal-text">${data.concept}</p>
                    
                    <h3 class="modal-section-title">SPECIFICATION & DESIGN SPEC</h3>
                    <p class="modal-text" style="white-space: pre-wrap;">${data.spec}</p>

                    <h3 class="modal-section-title">TOOLS & TECH STACK</h3>
                    <ul class="tech-stack">
                        ${data.tech.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    ${data.url ? `<p style="margin-top:32px;"><a href="${data.url}" target="_blank" style="color:var(--accent); font-weight:bold; text-decoration:none;">WEBサイト実機を見る →</a></p>` : ''}
                </div>
                <div class="modal-gallery">
                    <h3 class="modal-section-title">DESIGN / ARCHITECTURE</h3>
                    ${data.images.map(img => `<img src="${img}" alt="詳細画像">`).join('')}
                </div>
            </div>
        `;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.scrollTop = 0;
    });
});

const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
homeBtn.addEventListener('click', closeModal);

// ESCキーで閉じる処理
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});

// ==========================================================================
// 4. GSAP & ScrollTrigger によるアニメーション
// ==========================================================================
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}
