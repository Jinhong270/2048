const VIEW_MESSAGE = 'jh270:viewport';
const VIEW_REQUEST = 'jh270:viewport-request';
const MIN_FIT = 0.1;

let hostView = null;
let fitFrame = 0;

function readHostView(data) {
    const width = Number(data.width);
    const height = Number(data.height);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
    if (width < 1 || height < 1) return null;
    return { width, height };
}

function currentView() {
    const own = { width: window.innerWidth, height: window.innerHeight };
    if (!hostView) return own;
    return {
        width: Math.min(own.width, hostView.width),
        height: Math.min(own.height, hostView.height)
    };
}

function fitToView() {
    const root = document.documentElement;
    const app = document.querySelector('.app');
    const board = document.querySelector('.board-section');
    const view = currentView();
    if (!app || !board || view.width < 1 || view.height < 1) return;

    root.style.setProperty('--view-w', `${view.width}px`);
    root.style.setProperty('--view-h', `${view.height}px`);
    root.classList.add('fitted');

    const bodyStyle = getComputedStyle(document.body);
    const padX = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight);
    const padY = parseFloat(bodyStyle.paddingTop) + parseFloat(bodyStyle.paddingBottom);
    const availW = Math.max(1, view.width - padX);
    const availH = Math.max(1, view.height - padY);
    const needW = Math.max(app.offsetWidth, board.offsetWidth, 1);
    const needH = Math.max(app.offsetHeight, 1);
    const fit = Math.max(MIN_FIT, Math.min(1, availW / needW, availH / needH));
    root.style.setProperty('--fit', fit.toFixed(4));
}

function scheduleFit() {
    if (fitFrame) return;
    fitFrame = window.requestAnimationFrame(() => {
        fitFrame = 0;
        fitToView();
    });
}

function initViewport() {
    window.addEventListener('resize', scheduleFit);
    window.addEventListener('orientationchange', scheduleFit);
    document.addEventListener('localechange', scheduleFit);
    window.addEventListener('message', (event) => {
        if (window.parent === window || event.source !== window.parent) return;
        const data = event.data;
        if (!data || data.type !== VIEW_MESSAGE) return;
        const next = readHostView(data);
        if (!next) return;
        hostView = next;
        scheduleFit();
    });
    fitToView();
    if (window.parent !== window) window.parent.postMessage({ type: VIEW_REQUEST }, '*');
}
