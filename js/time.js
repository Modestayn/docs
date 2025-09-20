(function () {
    const el = document.getElementById('current-time');
    if (!el) return;

    function formatTime(date) {

        return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    }

    function updateTime() {
        const now = new Date();
        el.textContent = formatTime(now);
    }

    updateTime();
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 60 * 1000);
    }, msToNextMinute);
})();
