// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ページトップボタン
// ========================================
const pageTop = document.getElementById('pageTop');
let scrollTimer = null;

window.addEventListener('scroll', function() {
    // スクロール中は非表示にする
    if (window.scrollY > 300) {
        pageTop.classList.add('scrolling');
        pageTop.classList.remove('show');
    } else {
        pageTop.classList.remove('show');
        pageTop.classList.remove('scrolling');
    }

    // 既存のタイマーをクリア
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }

    // スクロール停止後に再表示
    scrollTimer = setTimeout(function() {
        if (window.scrollY > 300) {
            pageTop.classList.remove('scrolling');
            pageTop.classList.add('show');
        }
    }, 150); // 150ms後にスクロール停止と判定
});

pageTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// フォームバリデーション
// ========================================
const contactForm = document.getElementById('contactFormLP');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 簡易的なバリデーション
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });

    // フォーカス時にエラー表示をクリア
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4A90E2';
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.required) {
                this.style.borderColor = '#E74C3C';
            } else {
                this.style.borderColor = '#E0E0E0';
            }
        });
    });
}

// ========================================
// スクロールアニメーション
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素
const animateElements = document.querySelectorAll('.reason-card, .service-card-lp, .property-card-lp, .testimonial-card-lp, .problem-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ヘッダー背景変更
// ========================================
const header = document.querySelector('.header-fixed');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// 電話番号クリック追跡（Google Analytics用）
// ========================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('電話番号クリック:', this.href);
        // ここにGoogle Analyticsのイベント送信コードを追加可能
    });
});

// ========================================
// CTAボタンクリック追跡
// ========================================
const ctaButtons = document.querySelectorAll('.btn-primary-large, .btn-submit-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('CTAボタンクリック:', this.textContent);
        // ここにGoogle Analyticsのイベント送信コードを追加可能
    });
});

// ========================================
// コンソールにウェルカムメッセージ
// ========================================
console.log('%c株式会社ライフエステート', 'color: #4A90E2; font-size: 24px; font-weight: bold;');
console.log('%cあなたの理想の住まい探しをサポートします', 'color: #7F8C8D; font-size: 14px;');
console.log('%cTEL: 045-678-9012', 'color: #27AE60; font-size: 14px;');
